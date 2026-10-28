import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import type { LucideIcon } from "lucide-react";

const DashboardStatsCard = ({
  header,
  stats,
  icon,
}: {
  header: string;
  stats: string | number;
  icon?: LucideIcon;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle> {header} </CardTitle>
      </CardHeader>

      <CardContent>
        <p> {stats} </p>
      </CardContent>
    </Card>
  );
};

export default DashboardStatsCard;
