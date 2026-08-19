import "./App.css";
import NavBar from "./components/NavBar";
import Canvas from "./components/Canvas";
import { DragDropProvider } from "@dnd-kit/react";
import Note, { type Colours } from "./components/Note";
import { useState } from "react";

export interface NoteType {
  id: number;
  position: {
    x: number;
    y: number;
  };
  colour: Colours;
}

const initialNotes: NoteType[] = [
  { id: 1, position: { x: 0, y: 0 }, colour: "red" },
  { id: 2, position: { x: 0, y: 0 }, colour: "yellow" },
  { id: 3, position: { x: 0, y: 0 }, colour: "green" },
  { id: 4, position: { x: 0, y: 0 }, colour: "blue" },
];

function App() {
  const [notes, setNotes] = useState<NoteType[]>(() => {
    const stored = localStorage.getItem("notes");
    return stored ? JSON.parse(stored) : initialNotes;
  });

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <NavBar />
      <DragDropProvider
        onDragEnd={(event) => {
          if (event.canceled) return;
          const id = event.operation.source?.id;
          if (id == null) return;

          const { transform } = event.operation;

          setNotes((prev) => {
            const updated = prev.map((note) =>
              note.id === id
                ? {
                    ...note,
                    position: {
                      x: note.position.x + transform.x,
                      y: note.position.y + transform.y,
                    },
                  }
                : note,
            );
            localStorage.setItem("notes", JSON.stringify(updated));
            return updated;
          });
        }}
      >
        <Canvas id="droppable">
          {notes.map((note) => (
            <Note
              position={note.position}
              id={note.id}
              key={note.id}
              colour={note.colour}
            />
          ))}
        </Canvas>
      </DragDropProvider>
    </div>
  );
}

export default App;
