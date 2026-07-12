import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { RegularUser } from "@/types/user.types";
import { TableDialog } from "./dialog/TableDialog";

export function UsersTable({ users, onUserDelete }: { users: RegularUser[]; onUserDelete: () => void }) {
    return (
        <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500">
                    No users yet.
                  </TableCell>
                </TableRow>
              )}
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {user.role}
                    </span>
                  </TableCell>
                  {/* <TableCell className="text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell> */}
                  <TableCell>
                    <TableDialog user={user} onUserDelete={onUserDelete}/>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
    )
}