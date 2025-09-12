'use client'
import { useActionState, useState, useEffect } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { createCustomer, CustomerState } from '@/lib/actions';

export default function Form() {
  const initialState: CustomerState = { message: null, errors: {}, previousValues: {} };
  const [state, formAction] = useActionState(createCustomer, initialState);

  // Local copy of errors (so we can clear them on typing)
  const [errors, setErrors] = useState<CustomerState['errors']>({});
  const [status, setStatus] = useState(state.previousValues?.status || '');

  // Sync server errors into local state whenever they change
  useEffect(() => {
    setStatus(state.previousValues?.status || '');
    setErrors(state.errors || {});
  }, [state.errors, state.previousValues]);

  // Map frontend input names -> schema keys
  const fieldMap = {
    customerName: 'name',
    customerEmail: 'email',
    customerStatus: 'status',
  } as const;

  type FieldName = keyof typeof fieldMap;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const field = e.target.name as FieldName;
    const schemaKey = fieldMap[field];
    if (schemaKey && errors?.[schemaKey]) {
      setErrors((prev) => ({ ...prev, [schemaKey]: undefined }));
    }
  }

  function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
  setStatus(e.target.value);
  if (errors?.status) {
    setErrors((prev) => ({ ...prev, status: undefined }));
  }
}

  return (
    <form action={formAction}>
      <div className="border-b border-white/10 bg-gray-50 rounded-xl px-2 pb-12">
        <h2 className="text-base/10 font-semibold">New Customer</h2>
        <p className="mt-1 text-sm/6 text-gray-400">Create new customer</p>

        {/* Name */}
        <div className="col-span-full mt-8">
          <label className="block text-sm/6 font-medium">Name</label>
          <div>
            <input
              
              id="name"
              type="text"
              name="customerName"
              defaultValue={state.previousValues?.name || ''}
              onChange={handleChange}
              className={`block w-full md:w-5/6 mb-2 rounded-md px-3 py-1.5 outline-1 -outline-offset-1
                placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2
                focus:outline-indigo-500 sm:text-sm/6 ${errors?.name ? 'border-red-500 border-2' : 'border-gray-300'}`}

              aria-describedby="name-error"
            />
          </div>
        </div>
        {/* Email */}
        <div className="col-span-full">
          <label className="block text-sm/6 font-medium">Email</label>
          <div>
            <input
              
              id="email"
              type="text"
              name="customerEmail"
              defaultValue={state.previousValues?.email || ''}
              onChange={handleChange}
              className={`block w-full md:w-5/6 mb-2 rounded-md px-3 py-1.5 outline-1 -outline-offset-1
                placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2
                focus:outline-indigo-500 sm:text-sm/6 ${errors?.email ? 'border-red-500 border-2' : 'border-gray-300'}`}

              aria-describedby="name-error"
            />
          </div>
        </div>
        {/* Status */}
        <label className="block text-sm/6 font-medium">Status</label>
        <select
          name="customerStatus"
          id="status"
          value={status}
          onChange={handleStatusChange}
          className={`block w-full md:w-5/6 rounded-md px-3 py-1.5 outline-1 -outline-offset-1
            placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2
            focus:outline-indigo-500 sm:text-sm/6 ${errors?.status ? 'border-red-500 border-2' : 'border-gray-300'}`}
          aria-describedby="status-error"
        >
          <option value="" disabled>
            Select Status
          </option>
          <option value="Active">
            Active
          </option>
          <option value="Inactive">
            Inactive
          </option>
        </select>
        <div>
            {state.message && (
              <p className="mt-2 text-sm text-red-500">{state.message}</p>
            )}
          </div>

        {/* Buttons */}
        <Button type="submit" className="mt-4 bg-emerald-500/100 w-25">
          Create
        </Button>
        <Button asChild className="ml-2 w-25">
          <Link href="/dashboard/customers">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}