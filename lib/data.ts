import postgres from 'postgres';
import {CustomersTable, ProductForm, ProductsTable, CustomerForm, OrdersTable, CustomerField, ProductsField, OrdersForm} from '@/lib/definitions'



const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const itemPerPage = 5;
export async function fetchFilteredProduct(
    query : string,
    currentPage: number ) {

    const offset = (currentPage - 1 ) * itemPerPage;
    try {
        const products = await sql<ProductsTable[]>`
        SELECT
            products.id,
            products.name,
            products.price,
            products.status,
            products.totalsales,
            products.createddate
        FROM products
        WHERE
        products.name ILIKE ${`%${query}%`} OR
        products.price::text ILIKE ${`%${query}%`} OR
        products.totalsales::text ILIKE ${`%${query}%`} OR
        products.createddate::text ILIKE ${`%${query}%`} OR
        products.status ILIKE ${`%${query}%`}
        ORDER BY id DESC
        LIMIT ${itemPerPage} OFFSET ${offset}`;
        return products
        
    } catch (error) {
    console.error('Database Error:', error);
  }
          
}

export async function fetchProductsPages(query: string) {
  try {
    const data = await sql`SELECT COUNT (*)
    FROM products
    WHERE
      id::text  ILIKE ${`%${query}%`} OR
      name ILIKE ${`%${query}%`} OR
      status ILIKE ${`%${query}%`} OR
      price::text ILIKE ${`%${query}%`}
  `;
    const totalPages = Math.ceil(Number(data[0].count) / itemPerPage);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}


export async function fetchProductById(id : string) {
  try {
    const data = await sql<ProductForm[]>`
    SELECT 
      products.id,
      products.name,
      products.price,
      products.totalsales,
      products.status
    FROM products
    WHERE products.id = ${id};
    `;
    return data[0];
  }   catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Product.');
  }
}

export async function fetchFilteredCostumers(
    query : string,
    currentPage: number ) {

    const offset = (currentPage - 1 ) * itemPerPage;
    try {
        const customers = await sql<CustomersTable[]>`
        SELECT
            id,
            name,
            status,
            email,
            created_date
        FROM customers
        WHERE
        name ILIKE ${`%${query}%`} OR
        email ILIKE ${`%${query}%`} OR
        status ILIKE ${`%${query}%`} OR
        created_date::text ILIKE ${`%${query}%`}
        ORDER BY id DESC
        LIMIT ${itemPerPage} OFFSET ${offset}`;
        return customers
        
    } catch (error) {
    console.error('Database Error:', error);
  }
          
}

export async function fetchCustomerById(id : string) {
  try {
    const data = await sql<CustomerForm[]>`
    SELECT 
      id,
      name,
      email,
      status
    FROM customers
    WHERE id = ${id};
    `;
    return data[0];
  }   catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Product.');
  }
}


export async function fetchCustomers() {
  try {
    const customers = await sql<CustomerField[]>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchProducts() {
  try {
    const products = await sql<ProductsField[]>`
      SELECT
        id,
        name, 
        price
      FROM products
      ORDER BY name ASC
    `;
    return products;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchOrdersPages(query: string) {
  try {
    const data = await sql`SELECT COUNT (*) 
    FROM orders o
    JOIN customers c ON o.customer_id = c.id 
    WHERE
      o.order_id::text ILIKE ${`%${query}%`} OR
      o.order_date::text ILIKE ${`%${query}%`} OR
      o.status ILIKE ${`%${query}%`} OR
      o.total_amount::text ILIKE ${`%${query}%`} OR
      c.name ILIKE ${`%${query}%`}
  `;
    const totalPages = Math.ceil(Number(data[0].count) / itemPerPage);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchFilteredOrders(
    query : string,
    currentPage: number ) {

    const offset = (currentPage - 1 ) * itemPerPage;
    try {
        const orders = await sql<OrdersTable[]> `
        SELECT 
        o.order_id, 
        o.order_date, 
        o.status,
        o.total_amount,
        c.name
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      WHERE
        o.order_id::text ILIKE ${`%${query}%`} OR
        o.order_date::text ILIKE ${`%${query}%`} OR
        o.status ILIKE ${`%${query}%`} OR
        o.total_amount::text ILIKE ${`%${query}%`} OR
        c.name ILIKE ${`%${query}%`}
      ORDER BY o.order_id DESC
      LIMIT ${itemPerPage} OFFSET ${offset};`
        return orders
    } catch (error) {
    console.error('Database Error:', error);
  }
          
}

export async function fetchOrderById(id : string) {
  try {
    const orderData = await sql<OrdersForm[]>`
    SELECT 
      o.order_id, 
      o.order_date,
      o.status,
      o.total_amount,
      c.id AS customer_id  
    FROM orders o
    JOIN customers c ON o.customer_id = c.id
    WHERE o.order_id = ${id};
    `;
    const orderItemsData = await sql`
    SELECT 
      oi.order_item_id,
      oi.order_id,
      oi.product_id,
      p.name AS product_name,
      p.price AS product_price,
      oi.quantity
    FROM order_items oi
    JOIN products p ON oi.product_id = p.id
    WHERE oi.order_id = ${id};
    `;
      
      
    return {
      order: orderData[0],
      items: orderItemsData
    }
  }   catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Order.');
  }
}

export interface Order {
  month: string;
  orders: number;
  [key: string]: string | number | Date | null | undefined;
}

export async function fetchOrders(): Promise<Order[]> {
  try {
    const rows = await sql<Order[]>`
      SELECT 
        TO_CHAR(order_date, 'Mon') AS month,
        COUNT(*)::int AS orders
      FROM orders
      GROUP BY month
      ORDER BY MIN(order_date);
    `;
    return rows;
  } catch (err) {
    console.error("Database Error:", err);
    return []; // fallback to empty array
  }
}

export async function fetchTotalOrders(): Promise<number> {
  try {
    const result = await sql<{ count: number }[]>`
      SELECT COUNT(*)::int AS count FROM orders;
    `;
    return result[0]?.count || 0;
  } catch (err) {
    console.error("Database Error:", err);
    return 0; // fallback to 0
  } 
}

export async function fetchTotalSalesAmount(): Promise<number> {
  try {
    const result = await sql<{ total: number }[]>`
      SELECT COALESCE(SUM(total_amount), 0)::float AS total FROM orders;
    `;
    return result[0]?.total || 0;
  } catch (err) {
    console.error("Database Error:", err);
    return 0; // fallback to 0
  } 
}

export async function fetchTotalCustomers(): Promise<number> {
  try {
    const result = await sql<{ count: number }[]>`
      SELECT COUNT(*)::int AS count FROM customers;
    `;
    return result[0]?.count || 0;
  } catch (err) {
    console.error("Database Error:", err);
    return 0; // fallback to 0
  }
}