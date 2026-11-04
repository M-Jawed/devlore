import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons/lib";

const DashboardStatsCard = ({
  header,
  stats,
  icon: Icon,
  iconSize,
  backgroundColor,
}: {
  header: string;
  stats: string | number;
  icon: IconType;
  iconSize?: string;
  backgroundColor?: string;
}) => {
  return (
    <Card className={`bg-${backgroundColor}`}>
      <CardHeader>
        {Icon && <Icon size={iconSize} />}
        <CardTitle className="mt-5 text-muted-foreground"> {header} </CardTitle>
      </CardHeader>
      <CardContent>
        <span className="text-2xl font-bold"> {stats} </span>
      </CardContent>
    </Card>
  );
};

export default DashboardStatsCard;
