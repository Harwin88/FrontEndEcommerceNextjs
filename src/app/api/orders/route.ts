import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// ✅ AGREGADO: Esquema de validación para órdenes
const createOrderSchema = z.object({
  customer: z.object({
    firstName: z.string().min(1, 'Nombre es requerido'),
    lastName: z.string().min(1, 'Apellido es requerido'),
    email: z.string().email('Email inválido'),
    phone: z.string().optional(),
  }),
  shipping: z.object({
    firstName: z.string().min(1, 'Nombre es requerido'),
    lastName: z.string().min(1, 'Apellido es requerido'),
    addressLine1: z.string().min(1, 'Dirección es requerida'),
    addressLine2: z.string().optional(),
    city: z.string().min(1, 'Ciudad es requerida'),
    state: z.string().min(1, 'Estado es requerido'),
    postalCode: z.string().optional(),
    country: z.string().default('CO'),
    phone: z.string().optional(),
    email: z.string().email().optional(),
  }),
  items: z
    .array(
      z.object({
        productId: z.string().min(1, 'ID del producto es requerido'),
        quantity: z.number().min(1, 'Cantidad debe ser mayor a 0'),
        unitPrice: z.number().min(0, 'Precio debe ser mayor o igual a 0'),
        title: z.string().min(1, 'Título del producto es requerido'),
      })
    )
    .min(1, 'Debe haber al menos un producto'),
  payment: z
    .object({
      method: z.string().optional(),
      transactionId: z.string().optional(),
      amount: z.number().min(0),
    })
    .optional(),
  notes: z.string().optional(),
});

export async function GET(req: NextRequest) {
  try {
    // Obtener parámetros de consulta
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    // ✅ Por ahora, devolver datos mock para pruebas
    // TODO: Integrar con la base de datos real
    const mockOrders = [
      {
        id: '1',
        orderNumber: 'ORD-001',
        status: 'pending',
        customer: {
          firstName: 'Juan',
          lastName: 'Pérez',
          email: 'juan@example.com',
        },
        total: 250000,
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        orderNumber: 'ORD-002',
        status: 'completed',
        customer: {
          firstName: 'María',
          lastName: 'García',
          email: 'maria@example.com',
        },
        total: 180000,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    // Filtrar por estado si se proporciona
    let filteredOrders = mockOrders;
    if (status) {
      filteredOrders = mockOrders.filter((order) => order.status === status);
    }

    // Filtrar por búsqueda si se proporciona
    if (search) {
      filteredOrders = filteredOrders.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
          order.customer.firstName
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          order.customer.lastName.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Paginación
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

    return NextResponse.json({
      orders: paginatedOrders,
      pagination: {
        page,
        limit,
        total: filteredOrders.length,
        totalPages: Math.ceil(filteredOrders.length / limit),
      },
    });
  } catch (error) {
    console.error('Error al obtener órdenes:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // ✅ Validación con Zod
    const validationResult = createOrderSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Datos de orden inválidos',
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const { customer, shipping, items, payment, notes } = validationResult.data;

    // ✅ Generar número de orden único
    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0')}`;

    // ✅ Calcular totales
    const subtotal = items.reduce(
      (total, item) => total + item.unitPrice * item.quantity,
      0
    );
    const taxAmount = subtotal * 0.19; // IVA 19%
    const shippingCost = subtotal > 100000 ? 0 : 15000; // Envío gratis por compras mayores a $100,000
    const total = subtotal + taxAmount + shippingCost;

    // ✅ Crear orden mock
    // TODO: Integrar con la base de datos real
    const newOrder = {
      id: Date.now().toString(),
      orderNumber,
      status: 'pending',
      customer,
      shipping,
      items,
      payment,
      notes,
      subtotal,
      taxAmount,
      shippingCost,
      total,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    console.log('✅ Orden creada:', newOrder);

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error('❌ Error al crear orden:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
