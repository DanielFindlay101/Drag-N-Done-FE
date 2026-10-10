import { type Task } from "../utils/types";
import CompletedTaskCard from "./CompletedTaskCard";
import { CircleX } from "lucide-react";
import Button from "./Button";
import { useFetchCompletedTasks } from "../hooks/useFetchCompletedTasks";

export default function CompletedTasksModal() {
  const { data: completedTasks, isPending } = useFetchCompletedTasks();

  if (isPending) return <p>Loading...</p>;

  return (
    <dialog
      // ref={dialogRef}
      id="completed-dialog"
      className="bg-orange-400 w-2/5 max-h-125 overflow-auto p-6 mx-auto my-auto border-2 border-black shadow-[4px_4px_rgba(0,0,0,0.75)]
             backdrop:bg-black/40 backdrop:backdrop-blur-sm hidden open:flex flex-col"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-black">Your completed tasks</h2>
        <Button variant="icon" commandFor="completed-dialog" command="close">
          <CircleX strokeWidth={3} />
        </Button>
      </div>
      {completedTasks?.length === 0 && (
        <p>You've not done anything yet pal... 👎🏻</p>
      )}
      <div className="space-y-4">
        {completedTasks?.map((Task: Task) => (
          <CompletedTaskCard key={Task.id} task={Task} />
        ))}
      </div>
    </dialog>
  );
}
