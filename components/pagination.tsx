'use client'
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { usePathname, useSearchParams } from 'next/navigation';


export default function TablePagination({ totalPages, currentPage }: { totalPages: number, currentPage: number }) {
const pathname = usePathname();
  const searchParams = useSearchParams();
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  }; 
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    window.location.href = createPageURL(value);
  };
   
 
  return (
    <Stack spacing={2}>
      <Pagination count={totalPages}  page={currentPage} variant="outlined" shape="rounded" onChange={handleChange}/>
    </Stack>
  );
}