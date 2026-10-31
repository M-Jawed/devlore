"use client";

import { ChartContainer, ChartTooltipContent, ChartTooltip } from "../ui/chart";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { BarChart, Bar, CartesianGrid, XAxis } from "recharts";

const UsersChart = () => {
  const chartData = [
    { month: "January", mobile: 8, desktop: 12 },
    { month: "May", mobile: 34, desktop: 20 },
    { month: "July", mobile: 45, desktop: 4 },
    { month: "September", mobile: 6, desktop: 9 },
  ];

  const chartConfig = {
    desktop: {
      label: "desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "mobile",
      color: "#60a5fa",
    },
  };
  return (
    <Card className="ring-0">
      <CardHeader>
        <CardTitle>New users per month</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid />
            <XAxis
              dataKey={"month"}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey={"desktop"} fill="#00FDDC" radius={5} />
            <Bar dataKey={"mobile"} fill="#60a5fa" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default UsersChart;
