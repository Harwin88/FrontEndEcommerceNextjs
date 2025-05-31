import { NextRequest, NextResponse } from 'next/server';
// import { orderService } from '@/services/orderService';
import { createOrderFromCartSimple } from '@/services/orderService.clean';

export async function POST(request: NextRequest) {
  try {
    console.log('🔄 ===== ENDPOINT /api/orders/save INICIADO =====');

    const body = await request.json();
    console.log('📋 Datos recibidos en el endpoint:', body);

    // Verificar si faltan datos críticos
    if (!body.items || body.items.length === 0) {
      console.error('❌ No se proporcionaron items');
      return NextResponse.json(
        { error: 'Items son requeridos' },
        { status: 400 }
      );
    }

    if (!body.cliente) {
      console.error('❌ No se proporcionaron datos del cliente');
      return NextResponse.json(
        { error: 'Datos del cliente son requeridos' },
        { status: 400 }
      );
    }

    // Preparar datos para el orderService
    const completeOrderData = {
      cliente: {
        firstName: body.cliente?.firstName || 'Cliente',
        lastName: body.cliente?.lastName || 'MercadoPago',
        email: body.cliente?.email || 'cliente@email.com',
        phone: body.cliente?.phone || '',
      },
      shippingAddress: body.shippingAddress || {
        firstName: body.cliente?.firstName || 'Cliente',
        lastName: body.cliente?.lastName || 'MercadoPago',
        addressLine1: 'Dirección no especificada',
        city: 'Ciudad no especificada',
        state: 'cundinamarca',
        postalCode: '110111',
        country: 'CO',
        phone: '',
        email: body.cliente?.email || 'cliente@email.com',
      },
      items: body.items.map((item: any) => ({
        productId: item.productId || item.id || `product-${Date.now()}`,
        variantId: item.variantId || null,
        quantity: item.quantity || 1,
        unitPrice: item.unitPrice || item.price || 0,
        originalPrice: item.originalPrice || item.unitPrice || item.price || 0,
        title: item.title || item.name || 'Producto',
        variantTitle: item.variantTitle || '',
        sku: item.sku || '',
        productImage: item.productImage || item.image || '',
      })),
      notes:
        typeof body.notes === 'string'
          ? body.notes
          : JSON.stringify(body.notes || {}),
    };

    console.log('🔧 Datos preparados para orderService:', completeOrderData);

    // Determinar si es un webhook basado en los datos
    const isWebhook =
      body.source === 'webhook' ||
      body.source === 'mercadopago_webhook' ||
      body.notes?.includes('mercadopago_webhook') ||
      body.notes?.includes('webhook');

    console.log('🔍 Detección de webhook:', isWebhook ? 'SÍ' : 'NO');

    // ✅ Crear la orden usando el método simplificado
    console.log('🚀 Creando orden con método simplificado...');
    const order = await createOrderFromCartSimple(completeOrderData, {
      skipAuth: isWebhook,
      source: isWebhook ? 'webhook' : 'user',
    });

    console.log('✅ Orden creada exitosamente:', order);

    // Respuesta exitosa
    return NextResponse.json({
      success: true,
      message: 'Orden creada exitosamente',
      order: order,
      orderNumber: order.orderNumber,
      orderId: order.documentId || order.id,
      total: order.totalAmount,
      status: order.status,
      source: isWebhook ? 'webhook' : 'user',
    });
  } catch (error: any) {
    console.error('💥 ===== ERROR EN ENDPOINT /api/orders/save =====');
    console.error('❌ Error completo:', error);
    console.error('❌ Stack trace:', error.stack);

    // Error response
    return NextResponse.json(
      {
        success: false,
        error: 'Error al crear la orden',
        message: error.message,
        details: error.stack,
      },
      { status: 500 }
    );
  }
}
