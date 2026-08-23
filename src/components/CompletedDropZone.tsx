import { useDroppable } from "@dnd-kit/react";
import CompletedNotesModal from "./CompletedNotesModal";

interface Props {
  id: string;
}

export default function CompletedDropZone({ id }: Props) {
  const { ref, isDropTarget } = useDroppable({ id, collisionPriority: 3 });

  return (
    <>
      <aside
        ref={ref}
        className={`absolute bottom-4 right-4 flex flex-col gap-4 items-center justify-center p-2 text-center text-xs font-bold pointer-events-none bg-teal-500 border-2 border-black shadow-[6px_6px_rgba(0,0,0,0.75)] transition-all duration-150 ${
          isDropTarget ? "size-96" : "size-64"
        }`}
      >
        <h3 className="text-xl">Drag here to complete!</h3>
        <button
          command="show-modal"
          commandFor="completed-dialog"
          className="pointer-events-auto bg-slate-300 p-2 border-2 border-black shadow-[2px_2px_rgba(0,0,0,0.75)] hover:cursor-pointer"
        >
          View all
        </button>
      </aside>
      <CompletedNotesModal />
    </>
  );
}
