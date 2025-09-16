'use client';
import { useActionState } from "react";
import { ProductForm } from "@/lib/definitions";
import { updateProduct, ProductState} from "@/lib/actions";
import { Button } from '../ui/button';
import Link  from 'next/link';

export default function Form ({product} : {product : ProductForm}){
    const initialState: ProductState = { message: null, errors: {}, previousValues: {} };
    const updateProductWithId = updateProduct.bind(null, product.id);
    const [state, formAction] = useActionState(updateProductWithId, initialState);
 
    return (
        <form action={formAction}>
             <div className="border-b border-white/10 bg-gray-50 rounded-xl px-2 pb-12">
      <h2 className="text-base/10 font-semibold">Update Product</h2>
      <p className="mt-1 text-sm/6 text-gray-400">Update product for your sales</p>

        <div className="col-span-full mt-8">
          <label className="block text-sm/6 font-medium">Name</label>
          <div>
            <input id="name" type="text" name="productName" defaultValue={product.name} className="block w-full md:w-5/6 mb-2 rounded-md px-3 py-1.5  outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" aria-describedby="name-error" />
          </div>
        </div>
           <div className="col-span-full">
          <label className="block text-sm/6 font-medium">Price</label>
          <div className="mt-2">
            <input id="stock" type="number" name="productPrice" defaultValue={product.price} className="block w-full md:w-5/6 mb-2 rounded-md px-3 py-1.5  outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
          </div>
        </div>
        <label className="block text-sm/6 font-medium">Status</label>
        <select name="productStatus" id="status" defaultValue={product.status} className="block w-full md:w-5/6 rounded-md px-3 py-1.5  outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6">
            <option id="in stock"  value="In Stock" >In Stock</option>
            <option id='out of stock'  value="Out of Stock">Out of Stock</option>
        </select>
        <div>
          <div>
            {state.message && (
              <p className="mt-2 text-sm text-red-500">{state.message}</p>
            )}
          </div>
        </div>


        <Button type='submit' className='mt-4  bg-emerald-500/100 w-25'>Update</Button>
        <Button asChild className='ml-2 w-25'>
        <Link href='/dashboard/products'>Cancel</Link>
        </Button>
        </div>
        </form>
    )
}