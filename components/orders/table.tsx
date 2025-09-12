import { fetchFilteredOrders} from '@/lib/data';
import {  UpdateOrder, DeleteOrder } from '../actions-table';
import { USDollar } from '@/lib/utils';

export default async function OrdersTable({
  query,
  currentPage
  
}: {
  query: string;
  currentPage : number
  
}) {
  const orders = await fetchFilteredOrders(query, currentPage);

  
  return (
    <div className="mt-6 flow-root block md:overflow-visible overflow-x-auto">
      <div className="inline-block min-w-full align-middle ">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0 ">
          <table className="min-w-full text-gray-900 md:table ">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6 sticky left-0 bg-gray-50 z-10">
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
              {orders?.map((order) => (
                <tr
                  key={order.order_id ?? order.name}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3 sticky left-0 bg-white z-10">
                    <div className="flex items-center gap-3 ">
                     
                      <p>{order.order_id}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {order.status}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {order.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                  {USDollar.format(order.total_amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                   <p>{new Intl.DateTimeFormat("en-GB").format(order.order_date)}</p>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateOrder id={order.order_id} />
                      <DeleteOrder id={order.order_id} /> 
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