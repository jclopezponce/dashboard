import { fetchFilteredProduct} from '@/lib/data';
import { DeleteProduct, UpdateProduct } from '../actions-table';

export default async function ProductsTable({
  query,
  currentPage
  
}: {
  query: string;
  currentPage : number
  
}) {
  const products = await fetchFilteredProduct(query, currentPage);
  return (
    <div className="mt-6 flow-root md:overflow-visible overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6 sticky left-0 bg-gray-50 z-10 md:static md:bg-transparent">
                  Product
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Price
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Total Sales
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
              {products?.map((product) => (
                <tr
                  key={product.id ?? product.name}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3 sticky left-0 bg-white z-10 md:static md:bg-transparent">
                    <div className="flex items-center gap-3">
                     
                      <p>{product.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.status}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.price}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.totalsales}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                   <p>{new Intl.DateTimeFormat("en-GB").format(product.createdDate)}</p>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateProduct id={product.id} />
                      <DeleteProduct id={product.id} />
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
