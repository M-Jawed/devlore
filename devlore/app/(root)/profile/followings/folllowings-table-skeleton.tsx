import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const FollowingsTableSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableHead>
          {" "}
          <Skeleton className="w-full h-full " />{" "}
        </TableHead>
        <TableHead>
          {" "}
          <Skeleton className="w-full h-full " />{" "}
        </TableHead>
        <TableHead>
          {" "}
          <Skeleton className="w-full h-full " />{" "}
        </TableHead>
      </TableHeader>
      <TableBody>
        <TableCell>
          {" "}
          <Skeleton className="w-full h-full" />{" "}
        </TableCell>
        <TableCell>
          {" "}
          <Skeleton className="w-full h-full" />{" "}
        </TableCell>
        <TableCell>
          {" "}
          <Skeleton className="w-full h-full" />{" "}
        </TableCell>
      </TableBody>
    </Table>
  );
};

export default FollowingsTableSkeleton;
