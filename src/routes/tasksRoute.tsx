import { useState } from "react";

import { useCompleteTask } from "../hooks/useCompleteTask";
import { useFetchTasks } from "../hooks/useFetchTasks";
import Note from "../components/Note";
import { DragDropProvider } from "@dnd-kit/react";
import CompletedDropZone from "../components/CompletedDropZone";
import Canvas from "../components/Canvas";

export const TasksRoute = () => {
  const [positions, setPositions] = useState<
    Record<string, { x: number; y: number }>
  >(() => {
    const stored = localStorage.getItem("note-positions");
    return stored ? JSON.parse(stored) : {};
  });

  const { mutate: markCompleted } = useCompleteTask();
  const { data: tasks, isPending } = useFetchTasks();

  if (isPending) return <p>Loading...</p>;

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) return;
        const id = event.operation.source?.id;
        if (id == null) return;

        const { transform } = event.operation;

        setPositions((prev) => {
          const current = prev[id] ?? { x: 0, y: 0 };
          const updated = {
            ...prev,
            [id]: {
              x: current.x + transform.x,
              y: current.y + transform.y,
            },
          };
          localStorage.setItem("note-positions", JSON.stringify(updated));
          return updated;
        });

        if (event.operation.target?.id === "drop-zone") {
          markCompleted(String(id));
        }
      }}
    >
      <Canvas id="droppable">
        {tasks
          ?.filter((task) => !task.completed)
          .map((task) => (
            <Note
              position={positions[task.id]}
              id={task.id}
              key={task.id}
              colour={task.colour}
              title={task.title}
              description={task.description}
              tag={task.tag}
            />
          ))}
        <CompletedDropZone id="drop-zone" />
      </Canvas>
    </DragDropProvider>
  );
};
