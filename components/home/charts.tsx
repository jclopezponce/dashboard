"use client";
import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

interface Order {
  month: string;
  orders: number;
}

export function Chart({ orders }: { orders: Order[] }) {
  return (
    <BarChart
       dataset={orders as any} 
      xAxis={[{ dataKey: "month" }]}
      series={[{ dataKey: "orders", label: "Orders" }]}
      height={300}
    />
  );
}
