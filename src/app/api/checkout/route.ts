import { NextRequest } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

// Configurar Mercado Pago
const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
});

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Método no permitido" }), { status: 405 });
  }

  try {
    const { items, payer } = await req.json();

    // Validar que 'items' es un array
    if (!items || !Array.isArray(items)) {
      return new Response(JSON.stringify({ error: "La lista de ítems es inválida." }), { status: 400 });
    }

    // Crear la preferencia de pago
    const preferenceData: Preference.createPayload = {
      items: items.map((item: any) => ({
        title: item.title,
        unit_price: item.price,
        quantity: item.quantity,
        currency_id: "ARS",
      })),
      payer,
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
        failure: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/failure`,
        pending: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/pending`,
      },
      auto_return: "approved",
    };

    const preference = new Preference(mercadopago);
    const response = await preference.create({ body: preferenceData });

    return new Response(JSON.stringify({ url: response.init_point }), { status: 200 });
  } catch (error) {
    console.error("Error al crear la preferencia:", error);
    return new Response(JSON.stringify({ error: "Error interno del servidor" }), { status: 500 });
  }
}
