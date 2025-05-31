import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 ===== ENDPOINT DEBUG: VERIFICAR ÓRDENES =====');

    const serviceToken = process.env.STRAPI_API_TOKEN;

    if (!serviceToken) {
      return NextResponse.json(
        { error: 'Token de servicio no configurado' },
        { status: 500 }
      );
    }

    const { GraphQLClient } = await import('graphql-request');
    const graphqlUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/graphql';

    const client = new GraphQLClient(graphqlUrl, {
      headers: {
        Authorization: `Bearer ${serviceToken}`,
      },
    });

    // Consultar las últimas 10 órdenes con sus items
    const query = `
      query GetOrdersForDebug {
        orders(pagination: { limit: 10 }, sort: ["createdAt:desc"]) {
          documentId
          orderNumber
          totalAmount
          createdAt
          orderItems {
            documentId
            sku
            productName
            quantity
            unitPrice
            createdAt
            order {
              documentId
              orderNumber
            }
          }
        }
      }
    `;

    const result = await client.request(query);

    if (!result?.orders) {
      return NextResponse.json(
        { error: 'No se pudieron obtener las órdenes' },
        { status: 500 }
      );
    }

    const orders = result.orders;
    const analysisResults = [];
    let totalIssues = 0;

    for (const order of orders) {
      const orderAnalysis = {
        orderId: order.documentId,
        orderNumber: order.orderNumber,
        totalAmount: order.totalAmount,
        createdAt: order.createdAt,
        itemCount: order.orderItems.length,
        issues: [],
        isConsistent: true
      };

      // Analizar cada item
      for (const item of order.orderItems) {
        if (item.order.documentId !== order.documentId) {
          orderAnalysis.issues.push({
            itemId: item.documentId,
            sku: item.sku,
            productName: item.productName,
            expectedOrderId: order.documentId,
            actualOrderId: item.order.documentId,
            actualOrderNumber: item.order.orderNumber
          });
          orderAnalysis.isConsistent = false;
          totalIssues++;
        }
      }

      analysisResults.push(orderAnalysis);
    }

    // Consultar también estadísticas generales de OrderItems
    const allItemsQuery = `
      query GetAllOrderItems {
        orderItems(pagination: { limit: 50 }, sort: ["createdAt:desc"]) {
          documentId
          sku
          productName
          createdAt
          order {
            documentId
            orderNumber
          }
        }
      }
    `;

    const allItemsResult = await client.request(allItemsQuery);
    const allItems = allItemsResult?.orderItems || [];

    // Agrupar items por SKU para detectar patrones
    const itemsBySku = {};
    allItems.forEach(item => {
      if (!itemsBySku[item.sku]) {
        itemsBySku[item.sku] = [];
      }
      itemsBySku[item.sku].push(item);
    });

    const skuAnalysis = Object.keys(itemsBySku).map(sku => ({
      sku,
      count: itemsBySku[sku].length,
      orders: [...new Set(itemsBySku[sku].map(item => item.order.orderNumber))],
      isDuplicated: itemsBySku[sku].length > 1
    }));

    const response = {
      summary: {
        totalOrders: orders.length,
        totalItems: allItems.length,
        ordersWithIssues: analysisResults.filter(o => !o.isConsistent).length,
        totalIssues,
        isHealthy: totalIssues === 0
      },
      orders: analysisResults,
      skuAnalysis: skuAnalysis.filter(s => s.isDuplicated), // Solo SKUs duplicados
      recommendations: []
    };

    // Generar recomendaciones
    if (totalIssues > 0) {
      response.recommendations.push('🔧 Hay OrderItems mal asociados a sus órdenes');
      response.recommendations.push('💡 Revisar la lógica de creación de OrderItems en GraphQL mutations');
    }

    if (skuAnalysis.some(s => s.isDuplicated)) {
      response.recommendations.push('⚠️ Hay SKUs duplicados en múltiples OrderItems');
      response.recommendations.push('💡 Esto es normal si el mismo producto se compra en órdenes diferentes');
    }

    if (response.summary.isHealthy) {
      response.recommendations.push('✅ Todas las órdenes tienen items correctamente asociados');
    }

    console.log(`📊 Análisis completado: ${orders.length} órdenes, ${totalIssues} problemas encontrados`);

    return NextResponse.json(response, { status: 200 });

  } catch (error: any) {
    console.error('❌ Error en verificación de órdenes:', error);
    return NextResponse.json(
      {
        error: 'Error al verificar órdenes',
        details: error.message
      },
      { status: 500 }
    );
  }
}
