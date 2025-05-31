import { logTunnelConfig } from '@/config/tunnel';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log('=== CREATE PREFERENCE DEBUG ===');
    console.log('Body recibido:', JSON.stringify(body, null, 2));

    // ✅ VALIDACIÓN SIMPLE: Solo verificar que existan items
    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { error: 'Se requiere al menos un item para crear la preferencia' },
        { status: 400 }
      );
    }

    const {
      dataForm,
      items,
      successUrl,
      failureUrl,
      pendingUrl,
      notificationUrl,
    } = body;

    // ✅ VERIFICAR MERCADOPAGO: Simplificado
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

    if (!accessToken) {
      console.log('⚠️ MercadoPago no configurado, usando modo de desarrollo');
      const mockPreferenceId = `DEV-PREF-${Date.now()}`;
      console.log('🔧 Creando preferencia simulada:', mockPreferenceId);

      return NextResponse.json({
        preference_id: mockPreferenceId,
        mode: 'development',
        message: 'Preferencia creada en modo de desarrollo',
      });
    }

    console.log('💳 MercadoPago configurado, creando preferencia real');

    // ✅ CONFIGURACIÓN DE TUNNEL
    const tunnelConfig = logTunnelConfig();

    // ✅ INICIALIZAR MERCADOPAGO
    const client = new MercadoPagoConfig({ accessToken });
    const preference = new Preference(client);

    // ✅ CONSTRUIR PREFERENCIA: Versión simplificada
    const preferenceItems = items.map((item: any) => ({
      id: String(item.id || 'item'),
      title: String(item.title || 'Producto'),
      description: String(item.description || 'Producto desde tienda'),
      quantity: Number(item.quantity) || 1,
      unit_price: Number(item.price) || 0,
      currency_id: 'COP',
    }));

    // ✅ URLs con fallbacks más robustos
    const backUrls = {
      success:
        successUrl ||
        tunnelConfig.successUrl ||
        'https://qrzq2bsn-3000.use.devtunnels.ms/order-success',
      failure:
        failureUrl ||
        tunnelConfig.failureUrl ||
        'https://qrzq2bsn-3000.use.devtunnels.ms/failure',
      pending:
        pendingUrl ||
        tunnelConfig.pendingUrl ||
        'https://qrzq2bsn-3000.use.devtunnels.ms/pending',
    };

    const preferenceData: any = {
      items: preferenceItems,
      back_urls: backUrls,
      notification_url:
        notificationUrl ||
        tunnelConfig.webhookUrl ||
        'https://qrzq2bsn-3000.use.devtunnels.ms/api/mercadopago/webhook',
      external_reference: `REF-${Date.now()}`,
      expires: false,
      // ✅ REMOVER auto_return por ahora para evitar el error
      // auto_return: 'approved',
    };

    // ✅ AGREGAR PAYER SI EXISTE: Simplificado
    if (dataForm && dataForm.email) {
      preferenceData.payer = {
        email: dataForm.email,
        ...(dataForm.firstName && { name: dataForm.firstName }),
        ...(dataForm.lastName && { surname: dataForm.lastName }),
      };
    }

    // ✅ VALIDACIÓN ESPECÍFICA para MercadoPago
    if (!preferenceData.back_urls.success) {
      console.log('⚠️ Falta success URL, usando localhost por defecto');
      preferenceData.back_urls.success = 'http://localhost:3000/order-success';
    }

    console.log(
      '📋 Datos de preferencia:',
      JSON.stringify(preferenceData, null, 2)
    );

    // ✅ CREAR PREFERENCIA
    const result = await preference.create({ body: preferenceData });

    console.log('✅ Preferencia creada exitosamente:', result.id);

    return NextResponse.json({
      preference_id: result.id,
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point,
    });
  } catch (error: any) {
    console.error('❌ Error detallado al crear preferencia:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });

    return NextResponse.json(
      {
        error: 'Error al crear la preferencia',
        message: error.message,
        details:
          process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
