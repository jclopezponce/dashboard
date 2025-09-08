import Form from '@/components/customers/edit-form';
import { fetchCustomerById } from '@/lib/data';
import { notFound } from 'next/navigation';
 
 export default async function Page(props: {params : Promise<{id : string}> }
 ){
    const params = await props.params;
    const id = params.id;
    const customer = await fetchCustomerById(id);
    if (!customer) {
    notFound();
  }
     return (
         
         <Form customer={customer}/>
     )
     
 }