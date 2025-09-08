import Form from '@/components/products/edit-form';
import { fetchProductById } from '@/lib/data';
import { notFound } from 'next/navigation';
 
 export default async function Page(props: {params : Promise<{id : string}> }
 ){
    const params = await props.params;
    const id = params.id;
    const product = await fetchProductById(id);
    if (!product) {
    notFound();
  }
     return (
         
         <Form product={product}/>
     )
     
 }