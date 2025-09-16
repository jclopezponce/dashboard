'use client'
import { useActionState, useState, useEffect } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { createOrder, OrderState } from '@/lib/actions';
import {CustomerField, ProductsField, ProductLine } from '@/lib/definitions';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { X } from 'lucide-react';
import Tooltip from '@mui/material/Tooltip';
import { USDollar } from '@/lib/utils';




export default function Form({products, customers}:{products : ProductsField[], customers: CustomerField[]}) {
  const initialState: OrderState = { message: '', errors: {}, previousValues: {} };
  const [state, formAction] = useActionState(createOrder, initialState);

  // Local copy of errors (so we can clear them on typing)
  const [errors, setErrors] = useState<OrderState['errors']>({});
  const [order, setOrder] = useState({
    customer_id: state.previousValues?.customer_id || "",
    order_date : state.previousValues?.order_date || "",
    status: state.previousValues?.status || "",
    total : 0
    });    
  const [orderLines, setOrderLines] = useState<ProductLine[]>([]);
  const [currentLine, setCurrentLine] = useState<ProductLine>({
    product_id: "",
    quantity: 1,
    price: 0,
  });

  // Sync server errors into local state whenever they change
  useEffect(() => {
    setOrder({
    customer_id: state.previousValues?.customer_id || "",
    order_date : state.previousValues?.order_date || "",
    status: state.previousValues?.status || "",
    total : orderLines.reduce((sum, line) => {
      const product = products.find(p => p.id.toString() === line.product_id);
      return sum + (product ? product.price * line.quantity : 0);
    }, 0),
    });
    setErrors(state.errors || {});
  }, [state.errors, state.previousValues]);

 function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
  const { name, value } = e.target;
  setOrder((prev) => ({
    ...prev,
    [name]: value,
  }));

  // Map frontend input names -> schema keys
  const fieldMap = {
    customer_id: "customer_id",
    status: "status",
    order_date: "order_date",
  } as const;

  const schemaKey = fieldMap[name as keyof typeof fieldMap];
  if (schemaKey && errors?.[schemaKey]) {
    setErrors((prev) => ({ ...prev, [schemaKey]: undefined }));
  }
}

function handleCurrentLineChange(e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
  const { name, value } = e.target;
  setCurrentLine((prev) => ({
    ...prev,
    [name]: name === "quantity" ? Number(value) : value,
  }));
}

function addProductLine() {
  if (!currentLine.product_id || currentLine.quantity <= 0) return;
  setOrderLines(prev => [...prev, currentLine]);
  setCurrentLine({ product_id: "", quantity: 1, price : 0 }); // reset inputs
}

useEffect(() => {
  const newTotal = orderLines.reduce((total, line) => {
    const product = products.find((p) => p.id.toString() === line.product_id);
    return total + (product ? product.price * line.quantity : 0);
  }, 0);

  setOrder((prev) => ({
    ...prev,
    total: newTotal,
  }));
}, [orderLines, products]);

  return (
    <form action={formAction}>
      <div className="border-b border-white/10 bg-gray-50 rounded-xl px-2 pb-12">
        <h2 className="text-base/10 font-semibold">New Sale</h2>
        <p className="mb-2 text-sm/6 text-gray-400">Create sale</p>

        {/* Name */}
        <label className="block text-sm/6 font-medium">Customer</label>
        <select
          name="customer_id"
          id="customer_id"
          value={order.customer_id}
          onChange={handleChange}
          className={`block md:w-5/6 w-full rounded-md px-3 py-1.5 outline-1 -outline-offset-1
            placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2
            focus:outline-indigo-500 sm:text-sm/6 ${errors?.customer_id ? 'border-red-500 border-2' : 'border-gray-300'}`}
          aria-describedby="status-error"
        >
          <option value="" disabled>
            Select Customer
          </option>
          {customers
          .filter((customer) => customer.status === "Active")
          .map((customer)=> (
            <option key={customer.id} value={customer.id}>
            {customer.name}
            </option>
          ))}
        </select>
        {/* Date */}
        <div className="col-span-full">
          <label className="block text-sm/6 font-medium">Date</label>
          <div >
            <input
              
              id="order_date"
              type="date"
              name="order_date"
              value={order.order_date}
              onChange={handleChange}
              className={`block md:w-5/6 w-full rounded-md px-3 py-1.5 outline-1 -outline-offset-1
                placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2
                focus:outline-indigo-500 sm:text-sm/6 ${errors?.order_date ? 'border-red-500 border-2' : 'border-gray-300'}`}

              aria-describedby="name-error"
            />
          </div>
        </div>
        {/* Products */}
        <label className="block text-sm/6 font-medium">Products</label>
        <div className='flex flex-row'>
        <select
          name="product_id"
          id="product_id"
          value={currentLine.product_id}
          onChange={handleCurrentLineChange}
          className={`md:basis-1/3 block w-45 md:w-5/6 rounded-md mr-5 px-3 py-1.5 outline-1 -outline-offset-1
            placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2
            focus:outline-indigo-500 sm:text-sm/6}`}
          aria-describedby="status-error"
        >
          <option value="" disabled>
            Select Product
          </option>
          {products
          .filter(product  => product.status === "In Stock")
          .filter(p => !orderLines.some(line => line.product_id === p.id.toString()))
          .map((product)=> (
            <option key={product.id} value={product.id}>
            {product.name} {` - $${product.price}`}
            </option>
          ))}
        </select>
        <input name='quantity' placeholder="Quantity" type="number" value={currentLine.quantity} onChange={handleCurrentLineChange} className={` basis-1/3 block w-5/6 mr-5 rounded-md px-3 py-1.5 outline-1 -outline-offset-1
                placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2
                focus:outline-indigo-500 sm:text-sm/6 `}/>
        <Fab size="small" color="secondary" aria-label="add" onClick={addProductLine} sx={{ width:  25, height: 25, minHeight: 25, mt : 0.5 }} >
          <Tooltip title="Add">
          <AddIcon />
          </Tooltip>
        </Fab>
        </div>
        <div className='border rounded-md md:w-75 mt-5'>
              <table className="w-full ">
        <thead>
          <tr>
            <th className="">Product</th>
            <th className="">Quantity</th>
            <th className="">Price</th>
          </tr>
        </thead>
        <tbody>
            {orderLines.map((line, index) => {
      const product = products.find((p) => p.id.toString() === line.product_id);
      return (
        <tr key={index} className='text-center'>
          <td className="border border-t-gray-300">{product?.name}</td>
          <td className="border border-gray-300">{line.quantity}</td>
          <td className="border border-t-gray-300">$ {product ? product.price * line.quantity : 0}</td>
          <td className="border border-t-gray-300">
            <button
              type="button"
              onClick={() => {
                setOrderLines(orderLines.filter((_, i) => i !== index));
              }}
            >
              <Tooltip title="Delete">
              <X size={16} color='red' className=' mt-1 border border-red-700 rounded-sm hover:bg-gray-300'/>
              </Tooltip>
            </button>
            </td>
            </tr>
              );
    })}
    
          </tbody>
      </table>
  {orderLines.length === 0 ? (
    <p className="text-500 text-sm mt-2 text-center">
      Add at least one product.
    </p>
  ) : (
    <p className="text-500 text-sm mt-2 text-right mr-5">
      Total: {USDollar.format(order.total)}
    </p>
  )}
      </div>
        {orderLines.map((line, i) => (
          <div key={i}>
            <input
              type="hidden"
              name={`orderLines[${i}][product_id]`}
              value={line.product_id}
            />
            <input
              type="hidden"
              name={`orderLines[${i}][quantity]`}
              value={line.quantity}
            />
            <input type="hidden" name="total" value={order.total} />

          </div>
    ))}
        {/* Status */}
        <label className="block text-sm/6 font-medium">Status</label>
        <select
          name="status"
          id="status"
          value={order.status}
          onChange={handleChange}
          className={`block w-full md:w-5/6 rounded-md px-3 py-1.5 outline-1 -outline-offset-1
            placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2
            focus:outline-indigo-500 sm:text-sm/6 ${errors?.status ? 'border-red-500 border-2' : 'border-gray-300'}`}
          aria-describedby="status-error"
        >
          <option value="" disabled>
            Select Status
          </option>
          <option value="Paid">
            Paid
          </option>
          <option value="Pending">
            Pending
          </option>
        </select>
        <div>
            {state.message && (
              <p className="mt-2 text-sm text-red-500">{state.message}</p>
            )}
          </div>

        {/* Buttons */}
        <Button type="submit" className="mt-4 bg-emerald-500/100 w-25" disabled={orderLines.length === 0}>
          Create
        </Button>
        <Button asChild className="ml-2 w-25">
          <Link href="/dashboard/sales">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}