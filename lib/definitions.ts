export type ProductsTable = {
    id: string, 
    name: string;
    status: "In Stock" | "Out of Stock";
    price: number;
    totalsales: number;
    createdDate: Date;
};

export type ProductForm = {
    id : string,
    name : string,
    price : number,
    totalsales : number,
    status : "In Stock" | "Out of Stock",
    createdDate : Date
}

export type CustomersTable = {
    id: string, 
    name: string;
    status: "Active" | "Inactive";
    email: string;
    created_date: Date;
};

export type CustomerForm = {
    id: string, 
    name: string;
    status: "Active" | "Inactive";
    email: string;
    created_date: Date;
};

export type OrdersTable = {
    order_id: string, 
    name: string;
    status: "Pending" | "Paid";
    order_date: Date;
    total_amount: number;
};

export type OrdersForm = {
    order_id: string, 
    customer_id: string;
    status: "Pending" | "Paid";
    order_date : Date;
    total : number;
};

export type CustomerField = {
    id : string;
    name: string
}

export type ProductsField = {
    id : string;
    name: string;
    price: number;
    status: string
}

export type ProductLine = {
  product_id: string;
  quantity: number;
  price: number;
};