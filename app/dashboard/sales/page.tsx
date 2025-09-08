import  OrdersTable from "@/components/orders/table"
import {SearchInput} from "@/components/products/search-input"
import { Suspense } from 'react';
import { fetchOrdersPages } from "@/lib/data";
import { Button } from "@/components/ui/button";
import  Link  from "next/link"
import { TableOrdersSkeleton } from "@/components/skeletons";
import TablePagination from "@/components/pagination";



export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page? : number
    
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchOrdersPages(query);

  return (
    <div className="container w-full mx-auto py-10">
      <div className="flex flex-row justify-end">
      <SearchInput />
      <Button asChild>
        <Link href='/dashboard/sales/create'>
            Create Order 
          </Link></Button>
          </div>
      <Suspense key={query + currentPage} fallback={<TableOrdersSkeleton/>}>
      <OrdersTable query={query} currentPage={currentPage}/>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <TablePagination totalPages={totalPages} currentPage={currentPage}/>
      </div>
    </div>
  )
}