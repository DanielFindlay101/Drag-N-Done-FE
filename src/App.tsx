import "./App.css";
import NavBar from "./components/NavBar";
import Canvas from "./components/Canvas";
import { DragDropProvider } from "@dnd-kit/react";
import Note, { type Colours } from "./components/Note";
import CompletedDropZone from "./components/CompletedDropZone";
// import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export interface Notes {
  id: string;
  title: string;
  description: string;
  tag?: string;
  completed: boolean;
  colour: Colours;
}

const fetchNotes = async (): Promise<Notes[]> => {
  const response = await fetch("http://localhost:8787/todos", {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Cannot fetch the notes");
  }
  return response.json();
};

const completeTodo = async (id: string): Promise<Notes> => {
  const response = await fetch(`http://localhost:8787/todos/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: true }),
  });
  if (!response.ok) {
    throw new Error("Cannot update the todo");
  }
  return response.json();
};

function App() {
  const [positions, setPositions] = useState<
    Record<string, { x: number; y: number }>
  >(() => {
    const stored = localStorage.getItem("note-positions");
    return stored ? JSON.parse(stored) : {};
  });

  const { data: notes, isPending } = useQuery({
    queryKey: ["get-notes"],
    queryFn: fetchNotes,
  });

  const queryClient = useQueryClient();
  const { mutate: markCompleted } = useMutation({
    mutationFn: completeTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-notes"] });
    },
  });

  if (isPending) return <p>Loading...</p>;

  //TODO: Come back to this on deletion
  //   useEffect(() => {
  //   if (!notes) return;
  //   setPositions((prev) => {
  //     const validIds = new Set(notes.map((n) => n.id));
  //     const pruned = Object.fromEntries(
  //       Object.entries(prev).filter(([id]) => validIds.has(id)),
  //     );
  //     if (Object.keys(pruned).length === Object.keys(prev).length) return prev;
  //     localStorage.setItem("todo-positions", JSON.stringify(pruned));
  //     return pruned;
  //   });
  // }, [notes]);

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <NavBar />
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
              [id]: { x: current.x + transform.x, y: current.y + transform.y },
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
          {notes
            ?.filter((note) => !note.completed)
            .map((note) => (
              <Note
                position={positions[note.id]}
                id={note.id}
                key={note.id}
                colour={note.colour}
                title={note.title}
                description={note.description}
                tag={note.tag}
              />
            ))}
          <CompletedDropZone id="drop-zone" />
        </Canvas>
      </DragDropProvider>
    </div>
  );
}

export default App;
