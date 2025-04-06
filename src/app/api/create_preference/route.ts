import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from 'mercadopago';



export async function POST(req: Request) {
  try {
    const { dataForm, items, successUrl, failureUrl, pendingUrl, notificationUrl } = await req.json();

    // Validar que el access token está definido
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
    if (!accessToken) {
      throw new Error("El token de acceso de Mercado Pago no está configurado.");
    }
    console.log("paymen data:", dataForm);
    // Inicializar la configuración de Mercado Pago
    const client_one = new MercadoPagoConfig({ accessToken: accessToken });

//const preference = new Preference(client_one);
//    const client = new MercadoPagoConfig({ accessToken });
    const preference = new Preference(client_one);

    // Crear la preferencia de pago
    const preferenceData = await preference.create({
      body: {
        items: items.map((item: any) => ({
          id: item.title,
          title: item.title,
          description: item.description || "Item description",
          picture_url: item.picture_url || "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
          category_id: item.category_id || "art",
          quantity: item.quantity,
          unit_price: Number(item.price),
        })),
        payer: {
          name: dataForm.firstName,
          surname: dataForm.lastName,
          email: dataForm.email,
          identification: {
            type: dataForm.documentType, // Cédula de ciudadanía para Colombia
            number: dataForm.documentNumber,
          },
          phone: {
            area_code: "57",
            number: dataForm.phone,
          },
          address: {
            street_name: dataForm.address,
            zip_code: "110110",
          },
        },
        back_urls: {
          success: successUrl,
          failure: failureUrl,
          pending: pendingUrl,
        },
        auto_return: "approved",
        payment_methods: {
          excluded_payment_methods: [], // Permitir todos los métodos
          excluded_payment_types: [],   // No excluir tipos de pago
          installments: 12, // Permitir hasta 12 cuotas
        },
        notification_url: notificationUrl,
        statement_descriptor: "MINEGOCIO",
        external_reference: "Reference_1234",
        expires: false, // Deshabilita expiración automática
      },
    });
    console.log("Sandbox URL:", preferenceData.sandbox_init_point);
    return NextResponse.json({ preference_id: preferenceData.id });
  } catch (error) {
    console.error("Error creando la preferencia:", error);
    return NextResponse.json({ error: "Error al crear la preferencia" }, { status: 500 });
  }
}
