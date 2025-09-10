"use client";

import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Order } from "@/lib/data";

interface ChartProps {
  orders: Order[];
}

export function Chart({ orders }: ChartProps) {
  if (!orders || orders.length === 0) {
    return <div className="text-center text-gray-500">No data available</div>;
  }

  return (
    <BarChart
      dataset={orders} // TS infers type from Order[]
      xAxis={[{ dataKey: "month" }]}
      series={[{ dataKey: "orders", label: "Orders" }]}
      yAxis={[{ label: "Orders", width: 60 }]}
      height={300}
      sx={{
        width: "100%",
        minHeight: 300,
      }}
    />
  );
}
