const fetch = require('node-fetch');

async function debugOrderItems() {
  const GRAPHQL_URL = 'http://localhost:1337/graphql';
  const API_TOKEN = process.env.STRAPI_API_TOKEN || 'tu_token_aqui';

  const query = `
    query {
      orders(pagination: { limit: 5 }, sort: ["createdAt:desc"]) {
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
          order {
            documentId
            orderNumber
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();

    if (result.errors) {
      console.error('❌ Errores GraphQL:', result.errors);
      return;
    }

    console.log('🔍 ===== ANÁLISIS DE ÓRDENES Y ORDER ITEMS =====');

    const orders = result.data.orders;
    console.log(`📊 Total de órdenes encontradas: ${orders.length}`);

    orders.forEach((order, index) => {
      console.log(`\n📦 ORDEN ${index + 1}:`);
      console.log(`   ID: ${order.documentId}`);
      console.log(`   Número: ${order.orderNumber}`);
      console.log(`   Total: $${order.totalAmount?.toLocaleString() || 0}`);
      console.log(`   Fecha: ${order.createdAt}`);
      console.log(`   OrderItems: ${order.orderItems.length}`);

      order.orderItems.forEach((item, itemIndex) => {
        console.log(`   📋 Item ${itemIndex + 1}:`);
        console.log(`      ID: ${item.documentId}`);
        console.log(`      SKU: ${item.sku}`);
        console.log(`      Producto: ${item.productName}`);
        console.log(`      Cantidad: ${item.quantity}`);
        console.log(`      Precio: $${item.unitPrice?.toLocaleString() || 0}`);
        console.log(
          `      Orden asociada: ${item.order.orderNumber} (${item.order.documentId})`
        );

        // Verificar si el item está asociado a la orden correcta
        if (item.order.documentId !== order.documentId) {
          console.log(`      ❌ PROBLEMA: Item asociado a orden diferente!`);
        } else {
          console.log(`      ✅ Correcto: Item asociado a su orden`);
        }
      });
    });

    // Consultar TODOS los OrderItems para ver el panorama completo
    console.log('\n🔍 ===== ANÁLISIS DE TODOS LOS ORDER ITEMS =====');

    const allItemsQuery = `
      query {
        orderItems(pagination: { limit: 20 }, sort: ["createdAt:desc"]) {
          documentId
          sku
          productName
          quantity
          createdAt
          order {
            documentId
            orderNumber
          }
        }
      }
    `;

    const allItemsResponse = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({ query: allItemsQuery }),
    });

    const allItemsResult = await allItemsResponse.json();

    if (allItemsResult.data) {
      const allItems = allItemsResult.data.orderItems;
      console.log(
        `📊 Total de OrderItems en la base de datos: ${allItems.length}`
      );

      // Agrupar por SKU para detectar duplicados
      const itemsBySku = {};
      allItems.forEach((item) => {
        if (!itemsBySku[item.sku]) {
          itemsBySku[item.sku] = [];
        }
        itemsBySku[item.sku].push(item);
      });

      console.log('\n📋 Items agrupados por SKU:');
      Object.keys(itemsBySku).forEach((sku) => {
        const items = itemsBySku[sku];
        console.log(`\n   SKU: ${sku} (${items.length} items)`);
        items.forEach((item) => {
          console.log(
            `     - ID: ${item.documentId} | Orden: ${item.order.orderNumber} | Fecha: ${item.createdAt}`
          );
        });

        if (items.length > 1) {
          console.log(
            `     ⚠️ POSIBLE DUPLICACIÓN: ${items.length} items con mismo SKU`
          );
        }
      });
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

debugOrderItems().catch(console.error);
