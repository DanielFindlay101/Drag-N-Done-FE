import { useDroppable } from "@dnd-kit/react";
import CompletedTasksModal from "./CompletedTasksModal";
import Button from "./Button";

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
        <Button
          variant="neutral"
          command="show-modal"
          commandFor="completed-dialog"
          className="pointer-events-auto"
        >
          View all
        </Button>
      </aside>
      <CompletedTasksModal />
    </>
  );
}
