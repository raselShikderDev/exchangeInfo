import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import type { ITask } from "@/redux/types";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  toggoleIsCompleted,
  taskDelete,
  taskUpdate,
} from "@/redux/features/todoSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { userSelector } from "@/redux/features/userSlice";

interface TaskCardProps {
  task: ITask;
}

export default function TaskCard({ task }: TaskCardProps) {
  const { id, title, description, dueDate, isComplete, priority, assignedTo } = task;

  const dispatch = useAppDispatch();
  const users = useAppSelector(userSelector)
  const user = users.find((user)=> user.userId === assignedTo)
  console.log(user.)
  // Handle open/close of the edit modal
  const [open, setOpen] = useState(false);

  // Local state to hold form values while editing
  const [formData, setFormData] = useState({
    title,
    description,
    dueDate: dueDate ? new Date(dueDate).toISOString().split("T")[0] : "", // Format to yyyy-mm-dd
    priority,
  });

  // When "Save" is clicked inside modal
  const handleEdit = () => {
    dispatch(
      taskUpdate({
        id,
        isComplete,
        ...formData,
        dueDate: new Date(formData.dueDate).toISOString(), // convert to ISO string
      })
    );
    setOpen(false);
  };

  const priorityColors: Record<string, string> = {
    Normal: "bg-green-500",
    Medium: "bg-yellow-500",
    High: "bg-red-500",
  };

  return (
    <>
      <Card className="w-full relative rounded-2xl border border-border shadow-sm transition-colors">
        {/* Priority dot */}
        <span
          className={`absolute top-2 left-2 w-3 h-3 rounded-full ${
            priorityColors[priority] || "bg-gray-400"
          }`}
          title={`Priority: ${priority}`}
        ></span>

        <CardContent className="p-4 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 w-full">
            <div className="flex flex-col w-full">
              <h3
                className={`font-semibold text-lg break-words ${
                  isComplete ? "line-through text-muted-foreground" : ""
                }`}
              >
                {title}
              </h3>
              {description && (
                <p className="text-sm text-muted-foreground break-words mt-1">
                  {description}
                </p>
              )}
              {dueDate && (
                <p className="text-xs text-muted-foreground mt-2">
                  🗓 Due: {format(dueDate, "PPP")}
                </p>
              )}
              {user && (
                <p className="text-xs text-muted-foreground mt-2">
                  Assigned To: {users}
                </p>
              )}
            </div>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="text-destructive hover:bg-destructive/10"
            onClick={() => dispatch(taskDelete(id))}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Checkbox
            checked={isComplete}
            onClick={() => dispatch(toggoleIsCompleted(id))}
            className="mt-1"
          />
          <Button
            size="icon"
            variant="ghost"
            className="text-blue-500 hover:bg-blue-100"
            onClick={() => setOpen(true)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
      {/* Edit Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>

          {/* Form inside modal */}
          <div className="grid gap-4 py-4">
            {/* Title input */}
            <Input
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

            {/* Description input */}
            <Textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            {/* Due date input */}
            <Input
              type="date"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
            />

            {/* Priority dropdown */}
            <Select
              value={formData.priority}
              onValueChange={(value: "Normal" | "Medium" | "High") =>
                setFormData({ ...formData, priority: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Normal">Normal</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Save button */}
          <Button onClick={handleEdit} className="w-full">
            Save Changes
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
