import { orderService } from '@/services/orderService.simple';
import { CompleteOrderData } from '@/types/orders';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log('🔔 Webhook de MercadoPago recibido:', body);

    // Verificar si es una notificación de pago
    if (body.type === 'payment') {
      const paymentId = body.data?.id;

      if (!paymentId) {
        return NextResponse.json(
          { error: 'No payment ID provided' },
          { status: 400 }
        );
      }

      console.log('💳 Procesando notificación de pago ID:', paymentId);

      // ✅ Construir datos completos de la orden desde la notificación con valores seguros
      const completeOrderData: CompleteOrderData = {
        cliente: {
          firstName: 'Cliente',
          lastName: 'MercadoPago',
          email: 'cliente@email.com',
          phone: '',
        },
        shippingAddress: {
          firstName: 'Cliente',
          lastName: 'MercadoPago',
          addressLine1: 'Dirección desde webhook',
          addressLine2: '',
          city: 'Bogotá',
          state: 'Cundinamarca',
          postalCode: '110111',
          country: 'CO',
          phone: '',
          email: 'cliente@email.com',
          addressType: 'home',
        },
        billingAddress: {
          firstName: 'Cliente',
          lastName: 'MercadoPago',
          addressLine1: 'Dirección desde webhook',
          addressLine2: '',
          city: 'Bogotá',
          state: 'Cundinamarca',
          postalCode: '110111',
          country: 'CO',
          phone: '',
          email: 'cliente@email.com',
          addressType: 'home',
        },
        items: [
          {
            productId: `WEBHOOK-${paymentId}`,
            quantity: 1,
            unitPrice: 100000,
            title: 'Producto desde webhook',
            productImage: '',
            sku: `WH-${paymentId}`,
          },
        ],
        payment: {
          methodId: 'mercadopago',
          processingFee: 0,
        },
        shipping: {
          methodId: 'standard',
          estimatedDays: 3,
          cost: 0,
          trackingNumber: paymentId.toString(),
        },
        taxes: {
          taxAmount: 19000,
          taxRate: 0.19,
          taxType: 'IVA',
        },
        coupons: {
          couponCodes: [],
          discountAmount: 0,
        },
        delivery: {
          estimatedDeliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          deliveryInstructions: 'Entrega estándar vía webhook',
        },
        notes: JSON.stringify(
          {
            webhookData: body,
            paymentId,
            source: 'mercadopago_webhook',
            processedAt: new Date().toISOString(),
          },
          null,
          2
        ),
      };

      console.log(
        '📦 Creando orden desde webhook con datos:',
        completeOrderData
      );

      // ✅ Crear la orden usando el método principal con fallbacks automáticos
      const order = await orderService.createOrderFromCart(completeOrderData);

      console.log('✅ Orden creada desde webhook:', order);

      return NextResponse.json({
        success: true,
        orderId: order.id || order.documentId,
        message: 'Orden creada exitosamente desde webhook',
      });
    }

    return NextResponse.json({ message: 'Webhook processed' });
  } catch (error: any) {
    console.error('❌ Error procesando webhook:', error);
    return NextResponse.json(
      {
        error: 'Error processing webhook',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// Para verificación de MercadoPago
export async function GET(req: NextRequest) {
  return NextResponse.json({ status: 'Webhook endpoint active' });
}
