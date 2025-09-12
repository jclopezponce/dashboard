import { Cards } from "@/components/home/cards";
import { Chart } from "@/components/home/charts";
import { fetchOrders, fetchTotalOrders, Order, fetchTotalSalesAmount, fetchTotalCustomers } from "@/lib/data";

export default async function Home() {
  const orders: Order[] = await fetchOrders();
  const totalOrders: number = await fetchTotalOrders();
  const totalSalesAmount: number = await fetchTotalSalesAmount();
  const totalCustomers: number = await fetchTotalCustomers();

  

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 border-b border-gray-200">
        
        <Cards orders={totalOrders} amount={totalSalesAmount} customers={totalCustomers}  />

        <div className="w-full rounded-lg bg-white p-4 shadow-md border border-gray-200">
          <Chart orders={orders} />
        </div>
      </div>
    </div>
  );
}
