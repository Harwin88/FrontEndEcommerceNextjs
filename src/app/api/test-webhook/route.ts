import { orderService } from '@/services/orderService.simple';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    console.log('🧪 Test endpoint de webhook accedido');

    return NextResponse.json({
      status: 'ok',
      message: 'Webhook endpoint funcionando correctamente',
      timestamp: new Date().toISOString(),
      url: req.url,
      headers: Object.fromEntries(req.headers.entries()),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log('🧪 Test webhook POST recibido:', body);

    // Simular un webhook de MercadoPago
    const testData = {
      cliente: {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        phone: '1234567890',
      },
      shippingAddress: {
        firstName: 'Test',
        lastName: 'User',
        addressLine1: 'Test Address 123',
        addressLine2: '',
        city: 'Bogotá',
        state: 'Cundinamarca',
        postalCode: '110111',
        country: 'CO',
        phone: '1234567890',
        email: 'test@example.com',
        addressType: 'home',
      },
      billingAddress: {
        firstName: 'Test',
        lastName: 'User',
        addressLine1: 'Test Address 123',
        addressLine2: '',
        city: 'Bogotá',
        state: 'Cundinamarca',
        postalCode: '110111',
        country: 'CO',
        phone: '1234567890',
        email: 'test@example.com',
        addressType: 'home',
      },
      items: [
        {
          productId: 'TEST-001',
          quantity: 1,
          unitPrice: 50000,
          title: 'Producto de prueba',
          productImage: '',
          sku: 'TEST-SKU-001',
        },
      ],
      payment: {
        methodId: 'test',
        processingFee: 0,
      },
      shipping: {
        methodId: 'standard',
        estimatedDays: 3,
        cost: 5000,
        trackingNumber: 'TEST-TRACK-123',
      },
      taxes: {
        taxAmount: 9500,
        taxRate: 0.19,
        taxType: 'IVA',
      },
      coupons: {
        couponCodes: [],
        discountAmount: 0,
      },
      delivery: {
        estimatedDeliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        deliveryInstructions: 'Entrega de prueba',
      },
      notes: JSON.stringify(
        {
          source: 'test_webhook',
          testData: body,
          timestamp: new Date().toISOString(),
        },
        null,
        2
      ),
    };

    console.log('🚀 Creando orden de prueba...');

    // Crear orden usando el sistema
    const order = await orderService.createOrderFromCart(testData);

    console.log('✅ Orden de prueba creada:', order);

    return NextResponse.json({
      success: true,
      message: 'Test webhook procesado exitosamente',
      order: {
        id: order.id || order.documentId,
        orderNumber: order.orderNumber,
        status: order.status,
        total: order.totalAmount || order.total,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('❌ Error en test webhook:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}
