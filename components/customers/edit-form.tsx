'use client';
import { useActionState } from "react";
import { CustomerForm } from "@/lib/definitions";
import { updateCustomer, CustomerState} from "@/lib/actions";
import { Button } from '../ui/button';
import Link  from 'next/link';

export default function Form ({customer}: {customer: CustomerForm}){
    const initialState: CustomerState = { message: null, errors: {}, previousValues: {} };
    const updateCustomerWithId = updateCustomer.bind(null, customer.id);
    const [state, formAction] = useActionState(updateCustomerWithId, initialState);
 
    return (
        <form action={formAction}>
             <div className="border-b border-white/10 pb-12">
      <h2 className="text-base/10 font-semibold">Update Customer</h2>
      <p className="mt-1 text-sm/6 text-gray-400">Update data of the customer</p>

        <div className="col-span-full mt-8">
          <label className="block text-sm/6 font-medium">Name</label>
          <div className="mt-2">
            <input id="name" type="text" name="customerName" defaultValue={customer.name} className="block w-5/6 rounded-md px-3 py-1.5  outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" aria-describedby="name-error" />
          </div>
        </div>
          <div className="col-span-full">
          <label className="block text-sm/6 font-medium">Email</label>
          <div className="mt-2">
            <input id="email" type="email" name="customerEmail" defaultValue={customer.email} className="block w-5/6 rounded-md px-3 py-1.5  outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" aria-describedby="name-error" />
          </div>
        </div>
        <label className="block text-sm/6 font-medium">Status</label>
        <select name="customerStatus" id="status" defaultValue={customer.status} className="block w-5/6 rounded-md px-3 py-1.5  outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6">
            <option id="in stock"  value="Active" >Active</option>
            <option id='out of stock'  value="Inactive">Inactive</option>
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
        <Link href='/dashboard/customers'>Cancel</Link>
        </Button>
        </div>
        </form>
    )
}