"use client";

import { Bar, BarChart, LineChart, Line, XAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import type { ChartConfig } from "../ui/chart";

const DashboardChart = () => {
  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="h-50 w-full">
      <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={"month"}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          dataKey={"desktop"}
          type={"natural"}
          stroke="#00FDDC"
          strokeWidth={4}
          dot={false}
        />

        <Line
          dataKey={"mobile"}
          type={"natural"}
          stroke="#F4D35E"
          strokeWidth={4}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
};

export default DashboardChart;
