import { NextRequest } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { z } from 'zod';

// ✅ AGREGADO: Esquema de validación con Zod
const checkoutSchema = z.object({
  items: z
    .array(
      z.object({
        title: z
          .string()
          .min(1, 'Título es requerido')
          .max(100, 'Título muy largo'),
        price: z.number().positive('El precio debe ser positivo'),
        quantity: z
          .number()
          .positive('La cantidad debe ser positiva')
          .int('La cantidad debe ser un entero'),
      })
    )
    .min(1, 'Debe haber al menos un item'),
  payer: z
    .object({
      email: z.string().email('Email inválido').optional(),
      name: z.string().optional(),
      surname: z.string().optional(),
      phone: z
        .object({
          area_code: z.string().optional(),
          number: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
});

// Configurar Mercado Pago
const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
});

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Método no permitido' }), {
      status: 405,
    });
  }

  try {
    const body = await req.json();

    // ✅ AGREGADO: Validación con Zod
    const validationResult = checkoutSchema.safeParse(body);

    if (!validationResult.success) {
      return new Response(
        JSON.stringify({
          error: 'Datos de entrada inválidos',
          details: validationResult.error.errors,
        }),
        { status: 400 }
      );
    }

    const { items, payer } = validationResult.data;

    // Crear la preferencia de pago
    const preferenceData: Preference.createPayload = {
      items: items.map((item) => ({
        title: item.title,
        unit_price: item.price,
        quantity: item.quantity,
        currency_id: 'ARS',
      })),
      payer,
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
        failure: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/failure`,
        pending: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/pending`,
      },
      auto_return: 'approved',
    };

    const preference = new Preference(mercadopago);
    const response = await preference.create({ body: preferenceData });

    return new Response(JSON.stringify({ url: response.init_point }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error al crear la preferencia:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500 }
    );
  }
}
