import Form from '@/components/orders/edit-form';
import { fetchCustomers, fetchProducts, fetchOrderById } from '@/lib/data';

export default async function Page(props: {
  params: Promise<{ id: string }>;
}) {
  const params = props.params;
  const  id  = (await params).id; // synchronous, do NOT await

  // Fetch all required data in parallel
  const [products, customers, orderData] = await Promise.all([
    fetchProducts(),
    fetchCustomers(),
    fetchOrderById(id),
  ]);

  const { order, items } = orderData;

  // Transform items for the form
  const orderLines = items.map(item => ({
    product_id: item.product_id.toString(),
    quantity: item.quantity,
    price: item.product_price,
  }));

  return (
    <Form
      products={products}
      customers={customers}
      order={order}
      initialOrderLines={orderLines} // prefill form
    />
  );
}
