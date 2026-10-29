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
  icon: Icon,
  backgroundColor,
}: {
  header: string;
  stats: string | number;
  icon: LucideIcon;
  backgroundColor?: string;
}) => {
  return (
    <Card className={`bg-${backgroundColor}`}>
      <CardHeader>
        {Icon && <Icon />}
        <CardTitle className="mt-5 text-muted-foreground"> {header} </CardTitle>
      </CardHeader>
      <CardContent>
        <span className="text-2xl font-bold"> {stats} </span>
      </CardContent>
    </Card>
  );
};

export default DashboardStatsCard;
