"use client";

import { ChartContainer, ChartTooltipContent, ChartTooltip } from "../ui/chart";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { BarChart, Bar, CartesianGrid, XAxis } from "recharts";
import { formatMonth } from "@/lib/utils";

const UsersChart = ({ data }: { data: { _id: string; users: number }[] }) => {
  const chartConfig = {
    users: {
      label: "Users",
      color: "#00FDDC",
    },
  };

  return (
    <Card className="ring-0">
      <CardHeader>
        <CardTitle>New users per month</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid />
            <XAxis
              dataKey={"_id"}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={formatMonth}
            />
            <ChartTooltip
              content={<ChartTooltipContent labelFormatter={formatMonth} />}
            />
            <Bar dataKey={"users"} fill="#00FDDC" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default UsersChart;
