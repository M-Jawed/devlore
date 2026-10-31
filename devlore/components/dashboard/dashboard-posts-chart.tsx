"use client";

import { Bar, BarChart, LineChart, Line, XAxis, CartesianGrid } from "recharts";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import type { ChartConfig } from "../ui/chart";
import { formatMonth } from "@/lib/utils";

const PostsChart = ({ data }: { data: { month: string; posts: number }[] }) => {
  const chartConfig = {
    posts: {
      label: "Posts",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  return (
    <Card className="ring-0">
      <CardHeader>
        <CardTitle>New posts per month</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart data={data} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={"_id"}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={formatMonth}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              dataKey={"posts"}
              type={"natural"}
              stroke="#00FDDC"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PostsChart;
