import { useQuery } from "@tanstack/react-query";
import type { Notes } from "../App";
import CompletedNoteCard from "./CompletedNoteCard";
import { CircleX } from "lucide-react";

const fetchCompletedNotes = async (): Promise<Notes[]> => {
  const response = await fetch("http://localhost:8787/todos?completed=true", {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Cannot fetch the notes");
  }
  return response.json();
};

export default function CompletedNotesModal() {
  const { data: completedNotes, isPending } = useQuery({
    queryKey: ["get-completed-notes"],
    queryFn: fetchCompletedNotes,
  });

  if (isPending) return <p>Loading...</p>;

  return (
    <dialog
      // ref={dialogRef}
      id="completed-dialog"
      className="bg-orange-400 w-2/5 max-h-125 overflow-scroll p-6 mx-auto my-auto border-2 border-black shadow-[4px_4px_rgba(0,0,0,0.75)]
             backdrop:bg-black/40 backdrop:backdrop-blur-sm hidden open:flex flex-col"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-black">Your completed tasks</h2>
        <button
          commandFor="completed-dialog"
          command="close"
          className="hover:cursor-pointer"
        >
          <CircleX strokeWidth={3} />
        </button>
      </div>
      {completedNotes?.length === 0 && (
        <p>You've not done anything yet pal... 👎🏻</p>
      )}
      <div className="space-y-4">
        {completedNotes?.map((note: Notes) => (
          <CompletedNoteCard key={note.id} note={note} />
        ))}
      </div>
    </dialog>
  );
}
