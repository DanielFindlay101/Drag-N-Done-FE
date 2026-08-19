import "./App.css";
import NavBar from "./components/NavBar";
import Canvas from "./components/Canvas";
import { DragDropProvider } from "@dnd-kit/react";
import Note, { type Colours } from "./components/Note";
// import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
        }}
      >
        <Canvas id="droppable">
          {notes?.map((note) => (
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
        </Canvas>
      </DragDropProvider>
    </div>
  );
}

export default App;
