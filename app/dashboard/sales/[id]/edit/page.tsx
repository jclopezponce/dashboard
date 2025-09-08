import Form from '@/components/orders/edit-form';
import { fetchCustomers, fetchProducts, fetchOrderById } from '@/lib/data';

interface PageProps {
  params: { id: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params}:  PageProps) {
  const { id } = params;

  // Fetch required data
  const products = await fetchProducts();
  const customers = await fetchCustomers();
  const { order, items } = await fetchOrderById(id);
  console.log(order);

  // Transform order items to your ProductLine type if needed
  const orderLines = items.map(item => ({
    product_id: item.product_id.toString(),
    quantity: item.quantity,
    price: item.product_price
  }));

  return (
    <Form
      products={products}
      customers={customers}
      order={order}
      initialOrderLines={orderLines} // Pass existing order items to prefill the form
    />
  );
}
