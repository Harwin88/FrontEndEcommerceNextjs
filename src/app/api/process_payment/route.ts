import { MercadoPagoConfig, Payment } from 'mercadopago';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

// ✅ AGREGADO: Lista de emails de prueba válidos para MercadoPago
const VALID_TEST_EMAILS = [
  'test_user_1@testuser.com',
  'test_user_2@testuser.com',
  'test_user_3@testuser.com',
  'test_user_4@testuser.com',
  'test_user_5@testuser.com',
  'test_user_6@testuser.com',
  'test_user_7@testuser.com',
  'test_user_8@testuser.com',
  'test_user_9@testuser.com',
  'test_user_10@testuser.com',
];

// ✅ FUNCIÓN: Validar y corregir email de prueba
function validateAndFixEmail(email: string): string {
  // Si es un email de producción válido, usarlo
  if (
    !email.includes('test') &&
    !email.includes('yopmail') &&
    email.includes('@')
  ) {
    return email;
  }

  // Si es un email de prueba, usar uno válido
  return VALID_TEST_EMAILS[0];
}

// ✅ AGREGADO: Esquema de validación para pagos
const paymentSchema = z.object({
  token: z.string().optional(),
  transaction_amount: z.number().positive('El monto debe ser positivo'),
  installments: z.number().positive().int().optional(),
  payment_method_id: z.string().min(1, 'Método de pago requerido'),
  payer: z.object({
    email: z.string().email('Email inválido'),
    entity_type: z.enum(['individual', 'association']).optional(),
    identification: z
      .object({
        type: z.string(),
        number: z.string(),
      })
      .optional(),
  }),
  description: z.string().max(255).optional(),
  external_reference: z.string().max(255).optional(),
  transaction_details: z
    .object({
      financial_institution: z.string().optional(),
    })
    .optional(),
});

// Verifica si el Access Token está definido (evita problemas en tiempo de ejecución)
if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
  throw new Error(
    '❌ MERCADOPAGO_ACCESS_TOKEN no está definido en las variables de entorno.'
  );
}

// Configurar Mercado Pago con tu Access Token
const mercadopagoConfig = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

export async function POST(req: NextRequest) {
  try {
    // Obtener el body de la solicitud
    const body = await req.json();

    // ✅ AGREGADO: Validación con Zod
    const validationResult = paymentSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Datos de pago inválidos',
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const {
      token,
      transaction_amount,
      installments,
      payment_method_id,
      payer,
      description,
      external_reference,
      transaction_details,
    } = validationResult.data;

    // ✅ NUEVO: Validar y corregir email
    const validEmail = validateAndFixEmail(payer.email);

    console.log(`📧 Email original: ${payer.email}`);
    console.log(`📧 Email corregido: ${validEmail}`);

    // Verifica si el método de pago requiere token
    const requiresToken = payment_method_id !== 'pse'; // No se requiere token para PSE

    if (requiresToken && !token) {
      return NextResponse.json(
        { error: 'Falta el token de la tarjeta' },
        { status: 400 }
      );
    }

    // ✅ MEJORADO: Obtener IP de manera más segura
    const ipAddress =
      req.headers.get('x-forwarded-for')?.split(',')[0] ||
      req.headers.get('x-real-ip') ||
      '127.0.0.1';

    // Construye el objeto de pago
    const paymentData: any = {
      transaction_amount,
      payment_method_id,
      payer: {
        email: validEmail, // ✅ Usar email validado
        entity_type: payer.entity_type || 'individual',
        identification: payer.identification,
      },
      transaction_details: transaction_details || {},
      description: description || 'Descripción de la compra',
      external_reference: external_reference || uuidv4(),
      callback_url: 'https://qrzq2bsn-3000.use.devtunnels.ms/order-success',
      additional_info: {
        ip_address: ipAddress,
      },
    };

    // Agregar token e installments solo si es necesario
    if (requiresToken) {
      paymentData.token = token;
      paymentData.installments = installments;
    }

    console.log('💳 Datos de pago preparados:', paymentData);

    // Instancia la clase Payment utilizando la configuración
    const paymentInstance = new Payment(mercadopagoConfig);

    // Realiza la solicitud de pago a Mercado Pago
    const response = await paymentInstance.create({
      body: paymentData,
      headers: {
        'X-Idempotency-Key': process.env.MERCADO_PAGO_APP_ID || uuidv4(),
      },
    });

    console.log('✅ Respuesta de Mercado Pago:', response);

    // ✅ MEJORADO: Devolver estructura consistente con validaciones
    const processedResponse = {
      id: response.id || null,
      status: response.status || null,
      status_detail: response.status_detail || null,
      payment_type_id: response.payment_type_id || null,
      payment_method_id: response.payment_method_id || null,
      transaction_amount: response.transaction_amount || null,
      external_reference: response.external_reference || null,
      callback_url: response.callback_url || null,
      payer: {
        id: response.payer?.id || null,
        email: response.payer?.email || null,
      },
      transaction_details: {
        external_resource_url:
          response.transaction_details?.external_resource_url || null,
        bank_transfer_id:
          response.transaction_details?.bank_transfer_id || null,
        financial_institution:
          response.transaction_details?.financial_institution || null,
      },
      // ✅ AGREGADO: Información adicional útil
      date_created: response.date_created || null,
      date_approved: response.date_approved || null,
      money_release_date: response.money_release_date || null,
      operation_type: response.operation_type || null,
      fee_details: response.fee_details || [],
    };

    console.log('✅ Respuesta procesada:', processedResponse);

    // Devuelve la respuesta exitosa
    return NextResponse.json(processedResponse, { status: 200 });
  } catch (error: any) {
    console.error('❌ Error al procesar el pago:', error);

    // ✅ MEJORADO: Manejo específico de errores de MercadoPago
    if (error.cause && Array.isArray(error.cause)) {
      const mpError = error.cause[0];
      if (mpError.code === 4390) {
        return NextResponse.json(
          {
            error:
              'Email no permitido para pruebas. Por favor usa un email de producción válido.',
            code: mpError.code,
            description: mpError.description,
          },
          { status: 403 }
        );
      }
    }

    return NextResponse.json(
      {
        error: error.message || 'Error interno del servidor',
        details: error.cause || null,
      },
      { status: 500 }
    );
  }
}
