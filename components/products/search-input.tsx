'use client'
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {useDebouncedCallback} from 'use-debounce';
 
export function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  
  const  handleSearch= useDebouncedCallback((term) =>{
    console.log(term)
    const params = new URLSearchParams(searchParams);
    params.set('page', '1')
     if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300)

  return (
    <div className='mr-4 mt-1 '>
      <input  className="h-full mr-2 rounded-md outline-3 outline-solid" name="query" placeholder='Search'  onChange={(e) => {
          handleSearch(e.target.value)
        } } defaultValue={searchParams.get('query')?.toString()}/>
    </div>
  )
}