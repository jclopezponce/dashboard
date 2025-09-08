import { Pencil, Trash } from 'lucide-react';
import Link from 'next/link';
import { deleteProduct, deleteCostumer, deleteOrder } from '@/lib/actions';
import Tooltip from '@mui/material/Tooltip';


export function UpdateProduct({id} : {id: string}) {
    return (
        <Link 
        href={`/dashboard/products/${id}/edit`}>
            <Tooltip title="Edit">
        <Pencil/>
        </Tooltip>
        </Link>
    )
}

export function DeleteProduct ({id} : {id: string}) {
    const deleteProductWithId = deleteProduct.bind(null, id);
    return (
        <form action={deleteProductWithId}>
            <button>
                <Tooltip title='Delete'>
                <Trash/>
                </Tooltip>
            </button>
            
        </form>

    )
}

export function UpdateCostumer({id} : {id: string}) {
    return (
        <Link 
        href={`/dashboard/customers/${id}/edit`}>
        <Tooltip title="Edit">
        <Pencil/>
        </Tooltip>
        </Link>
    )
}

export function DeleteCostumer ({id} : {id: string}) {
    const deleteCostumerWithId = deleteCostumer.bind(null, id);
    return (
        <form action={deleteCostumerWithId}>
            <button>
                <Tooltip title='Delete'>
                <Trash />
                </Tooltip>
            </button>
            
        </form>

    )
}

export function UpdateOrder({id} : {id: string}) {
    return (
        <Link 
        href={`/dashboard/sales/${id}/edit`}>
        <Tooltip title="Edit">
        <Pencil/>
        </Tooltip>
        </Link>
    )
}

export function DeleteOrder ({id} : {id: string}) {
    const deleteOrderWithId = deleteOrder.bind(null, id);
    return (
        <form action={deleteOrderWithId}>
            <button>
                <Tooltip title='Delete'>
                <Trash />
                </Tooltip>
            </button>
            
        </form>

    )
}