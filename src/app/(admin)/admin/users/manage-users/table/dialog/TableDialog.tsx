import { Button } from "@/components/ui/button";
import { removeUserById } from "@/lib/actions/user.actions";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RegularUser } from "@/types/user.types";
import EditUserForm from "./edit-user-form/EditUserForm";

export function TableDialog({ user, onUserDelete }: { user: RegularUser; onUserDelete: () => void }) {

  const deleteUserHandler = async (userId: string) => {
    const response = await removeUserById(userId);
    console.log("Delete user response:", response);

    if (response && response.success) {
      console.log("User deleted successfully");
      onUserDelete();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Manage</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Manage User</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
            userID: {user.id} {user.role}
          </DialogDescription>
        </DialogHeader>
        <EditUserForm user={user} />
        <div className="grid gap-4 py-4">
          <Button variant="outline">Edit</Button>
          <Button variant="destructive" onClick={() => deleteUserHandler(user.id)}>Delete</Button>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
