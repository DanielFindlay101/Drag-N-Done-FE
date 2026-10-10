import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCompleteTask } from "../hooks/useCompleteTask";
import Note from "../components/Note";
import { type Task } from "../utils/types";
import { DragDropProvider } from "@dnd-kit/react";
import CompletedDropZone from "../components/CompletedDropZone";
import Canvas from "../components/Canvas";

const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch("http://localhost:8787/todos", {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Cannot fetch the tasks");
  }
  return response.json();
};

export const TasksRoute = () => {
  const [positions, setPositions] = useState<
    Record<string, { x: number; y: number }>
  >(() => {
    const stored = localStorage.getItem("note-positions");
    return stored ? JSON.parse(stored) : {};
  });

  const { data: tasks, isPending } = useQuery({
    queryKey: ["get-tasks"],
    queryFn: fetchTasks,
  });

  const { mutate: markCompleted } = useCompleteTask();

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
