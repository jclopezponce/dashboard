'use server';
import {z} from 'zod';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ProductLine } from './definitions';


const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const ProductSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Enter name" }),
  price: z.coerce.number().min(1, { message: "Enter price" }),
   status: z.preprocess(
    (val) => (val === null ? "" : val),
    z.string()
      .refine((val) => ["In Stock", "Out of Stock"].includes(val), {
        message: "Select Status",
      })
  ),
});

const UpdateProduct = ProductSchema.omit({ id: true });

const CreateProduct = ProductSchema.omit({id : true});
export type ProductState = {
  errors?: {
    name?: string[];
    price?: string[];
    status?: string[];
  };
  message?: string | null;
  previousValues? :{
    name?: string;
    price?: string;
    status?: string;
  }
};


export async function createProduct(prevState: ProductState, formData : FormData) {
    const validatedFields  = CreateProduct.safeParse({
        name : formData.get('productName'),
        price : formData.get('productPrice'),
        status : formData.get('productStatus')
    });
      if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields',
       previousValues: {
        name: formData.get('productName')?.toString() || '',
        price: formData.get('productPrice')?.toString() || '',
        status: formData.get('productStatus')?.toString() || ''
      }
    };
  }
    const totalSales = 0;
     const {name, price, status} = validatedFields.data;
     const date = new Date().toISOString().split('T')[0];
     
     try {
     await sql`
     INSERT INTO products (name, price, totalsales, status, createddate) 
     VALUES (${name}, ${price}, ${totalSales}, ${status}, ${date})`;
     } catch (error) {
        console.log(error)
     }
     
     revalidatePath('/dashboard/products');
     redirect('/dashboard/products');     
    
}

export async function updateProduct(id : string, prevState: ProductState, formData : FormData) {
      const validatedFields  = UpdateProduct.safeParse({
        name : formData.get('productName'),
        price : formData.get('productPrice'),
        status : formData.get('productStatus')
    });
     if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to Update Product',
      previousValues: {
        name: formData.get("name")?.toString() || "",
        price: formData.get("price")?.toString() || "",
        status: formData.get("status")?.toString() || "",}
    };
  }
  const {name, price, status} = validatedFields.data;
    try {
        await sql`
        UPDATE products 
        SET name = ${name}, price = ${price}, status = ${status}
        WHERE id = ${id}`;
    } catch (error) {
        console.log(error)
    }

        
  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');    
}

export async function deleteProduct(id : string) {
    await sql`DELETE FROM products WHERE id = ${id}`;
    revalidatePath('/dashboard/products');
}

// Customers

const CustomerSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Enter name" }),
  email: z.email({ message: "Enter valid email" }),
  status: z.preprocess(
    (val) => (val === null ? "" : val),
    z.string().refine(
      (val) => ["Active", "Inactive"].includes(val),
      { message: "Select Status" }
    )
  ),
});


const CreateCustomer = CustomerSchema.omit({id : true});
const UpdateCustomer = CustomerSchema.omit({id : true});

export type CustomerState = {
  errors?: {
    name?: string[];
    email?: string[];
    status?: string[];
  };
  message?: string | null;
  previousValues? :{
    name?: string;
    email?: string;
    status?: string;
  }
};

export async function createCustomer(prevState: CustomerState, formData : FormData) {
    const validatedFields  = CreateCustomer.safeParse({
        name : formData.get('customerName'),
        email : formData.get('customerEmail'),
        status : formData.get('customerStatus')
    });
    console.log(validatedFields)
      if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields',
       previousValues: {
        name: formData.get('customerName')?.toString() || '',
        email: formData.get('customerEmail')?.toString() || '',
        status: formData.get('customerStatus')?.toString() || ''
      }
    };
  }
     const {name, email, status} = validatedFields.data;
     const date = new Date().toISOString().split('T')[0];
     
     try {
     await sql`
     INSERT INTO customers (name, email, status, created_date) 
     VALUES (${name}, ${email}, ${status}, ${date})`;
     } catch (error) {
        console.log(error)
     }
     
     revalidatePath('/dashboard/customers');
     redirect('/dashboard/customers');     
    
}

export async function updateCustomer(id : string, prevState: CustomerState, formData : FormData) {
      const validatedFields  = UpdateCustomer.safeParse({
        name : formData.get('customerName'),
        email : formData.get('customerEmail'),
        status : formData.get('customerStatus')
    });
     if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to Update Product',
      previousValues: {
        name: formData.get("name")?.toString() || "",
        email: formData.get("email")?.toString() || "",
        status: formData.get("status")?.toString() || "",}
    };
  }
  const {name, email, status} = validatedFields.data;
    try {
        await sql`
        UPDATE customers 
        SET name = ${name}, email = ${email}, status = ${status}
        WHERE id = ${id}`;
    } catch (error) {
        console.log(error)
    }

        
  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');    
}

export async function deleteCostumer(id : string) {
    await sql`DELETE FROM customers WHERE id = ${id}`;
    revalidatePath('/dashboard/costumer');
}

// Orders

const OrdersSchema = z.object({
  id: z.string(),
  customer_id: z.string().min(1, { message: "Enter customer" }),
  status: z.preprocess(
    (val) => (val === null ? "" : val),
    z.string().refine(
      (val) => ["Paid", "Pending"].includes(val),
      { message: "Select Status" }
    )
  ),
  order_date: z.string(),
  total : z.coerce.number()
});


const CreateOrder = OrdersSchema.omit({id : true});
const UpdateOrder = OrdersSchema.omit({id : true});

export type OrderState = {
  message: string ; // always a string
  errors: {
    customer_id?: string[];
    status?: string[];
    order_date?: string[];
  };
  previousValues?: {
    customer_id?: string;
    status?: string;
    order_date?: string;
  };
};


export async function createOrder(prevState: OrderState, formData : FormData) {
    const validatedFields  = CreateOrder.safeParse({
        customer_id : formData.get('customer_id'),
        status : formData.get('status'),
        order_date: formData.get('order_date'),
        total: formData.get('total')
    });
      if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields',
       previousValues: {
        customer_id: formData.get('customer_id')?.toString() || '',
        status: formData.get('status')?.toString() || '',
        order_date: formData.get('order_date')?.toString() || '',
      }
    };
  }
     const {customer_id, status, order_date, total} = validatedFields.data;

     // Parse order lines into ProductLine[]
  const orderLines: ProductLine[] = [];
  for (const [key, value] of formData.entries()) {
    const match = key.match(/^orderLines\[(\d+)\]\[(product_id|quantity)\]$/);
    if (match) {
      const index = parseInt(match[1]);
      const field = match[2] as keyof ProductLine;
      if (!orderLines[index]) orderLines[index] = { product_id: "", quantity: 0, price: 0 };
       if (field === "product_id") {
        orderLines[index].product_id = value.toString();
      } else if (field === "quantity") {
        orderLines[index].quantity = Number(value);
      }
    }
  }
  try {
    // 1️⃣ Insert order
    const [order] = await sql`
      INSERT INTO orders (customer_id, status, order_date, total_amount)
      VALUES (${customer_id}, ${status}, ${order_date}, ${total})
      RETURNING order_id
    `;

    const order_id = order.order_id;

    // 2️⃣ Build bulk VALUES for order_items
    if (orderLines.length > 0)
       {
      const values = orderLines
        .map((line) => `(${order_id}, '${line.product_id}', ${line.quantity})`)
        .join(', ');
    // 3️⃣ Insert order items
      await sql.unsafe(
        `INSERT INTO order_items (order_id, product_id, quantity) VALUES ${values}`
      );
        for (const line of orderLines) {
          await sql`
          UPDATE products
          SET totalsales = COALESCE(totalsales, 0) + ${line.quantity}
          WHERE id = ${line.product_id}
       `;
      }
    }
     } catch (error) {
        console.log(error)
     }
     
     revalidatePath('/dashboard/sales');
     redirect('/dashboard/sales');     
    
}


export async function updateOrder(
  order_id: string,
  prevState: OrderState,
  formData: FormData
) {
  const validatedFields = UpdateOrder.safeParse({
    customer_id: formData.get("customer_id"),
    status: formData.get("status"),
    order_date: formData.get("order_date"),
    total: formData.get("total"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to Update Order",
      previousValues: {
        customer_id: formData.get("customer_id")?.toString() || "",
        status: formData.get("status")?.toString() || "",
        order_date: formData.get("order_date")?.toString() || "",
      },
    };
  }

  const { customer_id, status, order_date, total } = validatedFields.data;

  // Parse order lines into ProductLine[]
  const orderLines: ProductLine[] = [];
  for (const [key, value] of formData.entries()) {
    const match = key.match(/^orderLines\[(\d+)\]\[(product_id|quantity)\]$/);
    if (match) {
      const index = parseInt(match[1]);
      const field = match[2] as keyof ProductLine;
      if (!orderLines[index])
        orderLines[index] = { product_id: '', quantity: 0, price: 0 };

      if (field === "product_id") {
        orderLines[index].product_id = value.toString();
      } else if (field === "quantity") {
        orderLines[index].quantity = Number(value);
      }
    }
  }
  const numericOrderId = Number(order_id);
  const oldProductIdsQuery = await sql`
    SELECT product_id FROM order_items WHERE order_id = ${numericOrderId}
  `;
  const oldProductIds = oldProductIdsQuery.map((row) => row.product_id);
  const newProductIds = orderLines.map((line) => line.product_id);
  const affectedProductIds = Array.from(new Set([...oldProductIds, ...newProductIds]));

  try {
    await sql.begin(async (tx) => {
      // 1️⃣ Update order details
      await tx`
        UPDATE orders
        SET customer_id = ${customer_id},
            status = ${status},
            order_date = ${order_date},
            total_amount = ${total}
        WHERE order_id = ${numericOrderId}
      `;

      // 2️⃣ Delete existing order items
      await tx`
        DELETE FROM order_items WHERE order_id = ${numericOrderId}
      `;

      // 3️⃣ Insert new order items
      if (orderLines.length > 0) {
        const insertValues: string[] = [];
        const params: (number | string)[] = [];

        orderLines.forEach((line, i) => {
          insertValues.push(`($${i * 3 + 1}, $${i * 3 + 2}, $${i * 3 + 3})`);
          params.push(numericOrderId, line.product_id, line.quantity);
        });

        const insertQuery = `
          INSERT INTO order_items (order_id, product_id, quantity)
          VALUES ${insertValues.join(", ")}
        `;
        await tx.unsafe(insertQuery, params);
      }

      // 4️⃣ Recalculate totalsales for affected products
      if (affectedProductIds.length > 0) {
        const recalcQuery = `
          UPDATE products p
          SET totalsales = sub.total_qty
          FROM (
            SELECT product_id, SUM(quantity) AS total_qty
            FROM order_items
            WHERE product_id IN (${affectedProductIds.map((_, i) => `$${i + 1}`).join(", ")})
            GROUP BY product_id
          ) sub
          WHERE p.id = sub.product_id
        `;
        await tx.unsafe(recalcQuery, affectedProductIds);
      }
    });
  } catch (error) {
    console.error("❌ Update Order Failed:", error);
    return { message: "Database update failed", errors: {} };
  }

  revalidatePath("/dashboard/sales");
  redirect("/dashboard/sales");
}


export async function deleteOrder(order_id : string) {
    await sql`DELETE FROM order_items WHERE order_id = ${order_id}`;
    await sql`DELETE FROM orders WHERE order_id = ${order_id}`;
    
    revalidatePath('/dashboard/orders');
}