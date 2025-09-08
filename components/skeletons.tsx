import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';

export  function TableOrdersSkeleton() {
  return (
    
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
    <table className="min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Order N°
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                Total
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Sale Date
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
            {Array.from({ length: 10 }).map((_, index) => (
                            <tr
                              key={index}
                              className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                            >
                                
                              <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                
                                  <Skeleton variant="rectangular" />
                                
                              </td>
                              <td className="whitespace-nowrap px-3 py-3">
                                <Skeleton variant="rectangular"/>
                              </td>
                              <td className="whitespace-nowrap px-3 py-3">
                                <Skeleton variant="rectangular" />
                              </td>
                              <td className="whitespace-nowrap px-3 py-3">
                              <Skeleton variant="rectangular" />
                              </td>
                              <td className="whitespace-nowrap px-3 py-3">
                                <Skeleton variant="rectangular" />
                              </td>
                              <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                <div className="flex justify-end gap-3">
                                    <Skeleton variant="rectangular"/>
                                </div>
                              </td>
                            </tr>
                            ))}
                                    
            </tbody>
          </table>
            </div>
        </div>
    </div>
  );
}

export function TableProductsSkeleton() {
  return (
    <div className="mt-6 flow-root">  
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
    <table className="min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">  
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Price
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Category
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                Stock
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Created At
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>  
            <tbody className="bg-white">
            {Array.from({ length: 10 }).map((_, index) => (
                            <tr
                              key={index}
                              className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                            >
                              <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                  <Skeleton variant="rectangular" />
                              </td>
                              <td className="whitespace-nowrap px-3 py-3">
                                <Skeleton variant="rectangular"/>
                              </td>
                              <td className="whitespace-nowrap px-3 py-3">
                                <Skeleton variant="rectangular" />
                              </td>
                              <td className="whitespace-nowrap px-3 py-3">
                              <Skeleton variant="rectangular" />
                              </td>
                              <td className="whitespace-nowrap px-3 py-3">
                                <Skeleton variant="rectangular" />
                              </td>
                              <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                <div className="flex justify-end gap-3">
                                    <Skeleton variant="rectangular"/>
                                </div>
                              </td>
                            </tr>
                            ))} 
            </tbody>
          </table>
            </div>
        </div>
    </div>
  );
}

export function TableCustomersSkeleton() {
  return (
    <div className="mt-6 flow-root">    
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
    <table className="min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">  
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Phone
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                Location
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Created At
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>  
            <tbody className="bg-white">
            {Array.from({ length: 10 }).map((_, index) => (
                            <tr
                              key={index}
                              className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                            >
                              <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                  <Skeleton variant="rectangular" />
                              </td>
                              <td className="whitespace-nowrap px-3 py-3">
                                <Skeleton variant="rectangular"/>
                              </td>
                              <td className="whitespace-nowrap px-3 py-3">
                                <Skeleton variant="rectangular" />
                              </td>
                              <td className="whitespace-nowrap px-3 py-3">
                              <Skeleton variant="rectangular" />
                              </td> 
                              <td className="whitespace-nowrap px-3 py-3">
                                <Skeleton variant="rectangular" />
                              </td>
                              <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                <div className="flex justify-end gap-3">
                                    <Skeleton variant="rectangular"/> 
                                </div>
                              </td>
                            </tr> 
                            ))}
            </tbody>
          </table>
            </div>
        </div>
    </div>
  );
}
