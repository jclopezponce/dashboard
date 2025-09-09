
import ProductsTable  from "@/components/products/table"
import {SearchInput} from "@/components/products/search-input"
import { Suspense } from 'react';
import { fetchProductsPages } from "@/lib/data";
import { Button } from "@/components/ui/button";
import  Link  from "next/link"
import TablePagination from "@/components/pagination";
import { TableProductsSkeleton } from "@/components/skeletons";



export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page? : number
    
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchProductsPages(query);

  return (
    <div className="container w-full py-10">
      <div className="flex flex-row justify-end">
      <SearchInput />
      <Button asChild>
        <Link href='/dashboard/products/create'>
            Create Product  
          </Link></Button>
          </div>
      <Suspense key={query + currentPage} fallback={<TableProductsSkeleton/>}>
      <ProductsTable query={query} currentPage={currentPage}/>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <TablePagination totalPages={totalPages} currentPage={currentPage}/>
    </div>
    </div>
  )
}