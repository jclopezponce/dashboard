
import { fetchFilteredCostumers} from '@/lib/data';
import { DeleteCostumer, UpdateCostumer } from '../actions-table';

export default async function CustomersTable({
  query,
  currentPage
  
}: {
  query: string;
  currentPage : number
  
}) {
  const costumers = await fetchFilteredCostumers(query, currentPage);
  return (
    <div className="mt-6 flow-root block md:overflow-visible overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6 sticky left-0 bg-gray-50 z-10 md:static md:bg-transparent">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Created Date
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {costumers?.map((costumer) => (
                <tr
                  key={costumer.id ?? costumer.name}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3   sticky left-0 bg-white z-10 md:static md:bg-transparent">
                    <div className="flex items-center gap-3">
                     
                      <p>{costumer.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {costumer.status}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {costumer.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                   <p>{new Intl.DateTimeFormat("en-GB").format(costumer.created_date)}</p>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateCostumer id={costumer.id} />
                      <DeleteCostumer id={costumer.id} />
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