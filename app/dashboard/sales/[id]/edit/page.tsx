import Form from '@/components/orders/edit-form';
import { fetchCustomers, fetchProducts, fetchOrderById } from '@/lib/data';

interface PageProps {
  params: { id: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params }: PageProps) {
  const { id } = params // no await here

  const [products, customers, orderData] = await Promise.all([
    fetchProducts(),
    fetchCustomers(),
    fetchOrderById(id),
  ])

  const { order, items } = orderData

  const orderLines = items.map(item => ({
    product_id: item.product_id.toString(),
    quantity: item.quantity,
    price: item.product_price,
  }))

  return (
    <Form
      products={products}
      customers={customers}
      order={order}
      initialOrderLines={orderLines}
    />
  )
}
