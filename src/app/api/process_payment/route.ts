import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { v4 as uuidv4 } from "uuid";
// Verifica si el Access Token está definido (evita problemas en tiempo de ejecución)
if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
  throw new Error("❌ MERCADOPAGO_ACCESS_TOKEN no está definido en las variables de entorno.");
}

// Configurar Mercado Pago con tu Access Token
const mercadopagoConfig = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

export async function POST(req: NextRequest) {
  try {
    // Obtener el body de la solicitud
    const body = await req.json();


    const {
      token,
      transaction_amount,
      installments,
      payment_method_id,
      payer,
      description,
      external_reference,
    } = body;

    // Validar los datos requeridos
    if (!transaction_amount || !payment_method_id || !payer?.email) {
      return NextResponse.json(
        { error: "Faltan campos requeridos: transaction_amount, payment_method_id o payer.email" },
        { status: 400 }
      );
    }

    // Verifica si el método de pago requiere token
    const requiresToken = payment_method_id !== "pse"; // No se requiere token para PSE

    if (requiresToken && !token) {
      return NextResponse.json(
        { error: "Falta el token de la tarjeta" },
        { status: 400 }
      );
    }
    const ipAddress = req.headers.get("x-forwarded-for") || req.ip || "127.0.0.1"; // Fallback a 0.0.0.0

    // Construye el objeto de pago
    const paymentData: any = {
      transaction_amount,
      payment_method_id,
      payer: {
        email: payer.email,
        entity_type: "individual",
        identification: payer.identification,
      },
      transaction_details: {
        financial_institution: body.transaction_details?.financial_institution, // ✅ Aquí debe ir este campo
      },
      description: description || "Descripción de la compra",
      external_reference: external_reference || uuidv4(),
      callback_url: "https://qrzq2bsn-3000.use.devtunnels.ms/mail-success",
      additional_info: {
        ip_address: ipAddress,
      },
    };
    

    // Agregar token e installments solo si es necesario
    if (requiresToken) {
      paymentData.token = token;
      paymentData.installments = installments;
    }

    // Instancia la clase Payment utilizando la configuración
    const paymentInstance = new Payment(mercadopagoConfig);

    // Realiza la solicitud de pago a Mercado Pago
    const response = await paymentInstance.create({
      body: paymentData,
      headers: { "X-Idempotency-Key": process.env.MERCADO_PAGO_APP_ID || "" },
    });

 
    console.log("✅ Respuesta de Mercado Pago:", response);
   
    // Devuelve la respuesta exitosa
    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error("❌ Error al procesar el pago:", error);
    return NextResponse.json(
      { error: error.message || "Error interno del servidor" },
      { status: 500 }
    );
  }
}
