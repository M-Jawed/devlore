import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types";
import TableEditAction from "./table-action-edit";
import TableDeleteAction from "./table-action-delete";

const DashboardAllUsers = ({ users }: { users: User[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>List of all the current users</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead> ID </TableHead>
              <TableHead> NAME </TableHead>
              <TableHead> USERNAME </TableHead>
              <TableHead> EMAIL </TableHead>
              <TableHead> ROLE </TableHead>
              <TableHead> ACTIONS </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: User) => (
              <TableRow key={user._id.toString()}>
                <TableCell className="truncate">
                  {user._id.toString()}
                </TableCell>
                <TableCell> {user.name ?? "undefined user"} </TableCell>
                <TableCell> {user.username ?? "no_username"} </TableCell>
                <TableCell> {user.email ?? "no_email"} </TableCell>
                <TableCell>
                  <Badge
                    variant={user.role === "admin" ? "secondary" : "outline"}
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-x-2">
                    <TableEditAction />
                    <TableDeleteAction />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DashboardAllUsers;
