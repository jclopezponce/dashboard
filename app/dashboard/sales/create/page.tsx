import Form from '@/components/orders/create-form';
import { fetchCustomers, fetchProducts } from '@/lib/data';

export default async function Page(){
    
    const products = await fetchProducts();
    const customers = await fetchCustomers();
    return (
        
        <Form products={products} customers={customers}/>
    )
    
}