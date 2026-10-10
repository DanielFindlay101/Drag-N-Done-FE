import { useQueryClient, useQuery } from "@tanstack/react-query";
import { CircleX } from "lucide-react";
import { useState, useRef } from "react";
import Button from "./Button";

const getTags = async (): Promise<string[]> => {
  const response = await fetch("http://localhost:8787/tags", {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Cannot fetch the tags");
  }
  return response.json();
};

const colourOptions = [
  { value: "green", className: "bg-green-400" },
  { value: "blue", className: "bg-blue-400" },
  { value: "red", className: "bg-red-400" },
  { value: "yellow", className: "bg-yellow-400" },
  { value: "indigo", className: "bg-indigo-400" },
];

export default function CreateModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selectedTag, setSelectedTag] = useState("");
  const { data: tags } = useQuery({ queryKey: ["tags"], queryFn: getTags });
  const queryClient = useQueryClient();

  const handleCreateTodo = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const title = formData.get("title");
    const description = formData.get("description");
    const selectedTag = formData.get("tag");
    const newTag = formData.get("new-tag");
    const tag = selectedTag === "new" ? newTag : selectedTag;
    const colour = formData.get("colour");

    try {
      const response = await fetch("http://localhost:8787/todos", {
        method: "POST",
        body: JSON.stringify({ title, description, tag, colour }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        console.error("Cannot create a todo");
        return;
      }
      //refetch tags and todos(notes) here to include the new one and cleanup
      await queryClient.invalidateQueries({ queryKey: ["tags"] });
      await queryClient.invalidateQueries({ queryKey: ["get-notes"] });
      form.reset();
      setSelectedTag("");
      dialogRef.current?.close();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      id="create-dialog"
      className="bg-indigo-400 w-2/5 p-6 mx-auto my-auto border-2 border-black shadow-[4px_4px_rgba(0,0,0,0.75)]
             backdrop:bg-black/40 backdrop:backdrop-blur-sm hidden open:flex flex-col"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-black">What is there to do?</h2>
        <Button variant="icon" commandFor="create-dialog" command="close">
          <CircleX strokeWidth={3} fill="#CAD5E2" />
        </Button>
      </div>
      <form
        action=""
        className="space-y-5 flex flex-col m-auto w-full justify-center"
        onSubmit={handleCreateTodo}
      >
        <label htmlFor="title" className="flex flex-col">
          {" "}
          Title
          <input
            placeholder="Go for a walk..."
            className="inputs"
            name="title"
          />
        </label>

        <label htmlFor="description" className="flex flex-col">
          Enter a description
          <textarea
            name="description"
            id="description"
            placeholder="Step on leaves and feel the wind..."
            className="inputs resize-none"
          />
        </label>

        <label htmlFor="tag-select">
          Tag (Optional)
          <select
            name="tag"
            id="tag-select"
            className="inputs"
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            <option value=" ">--Choose a tag</option>
            {tags?.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
            <option value="new">Create a new tag</option>
          </select>
        </label>

        {selectedTag === "new" ? (
          <label htmlFor="create-tag">
            {" "}
            Create a new tag
            <input
              type="text"
              placeholder="e.g. house, shop, etc"
              className="inputs"
              name="new-tag"
            />
          </label>
        ) : null}

        <fieldset className="flex items-center gap-2">
          <legend>Choose a colour:</legend>
          <div className="flex gap-2">
            {colourOptions.map((colour, i) => (
              <label key={colour.value} className="cursor-pointer">
                <input
                  type="radio"
                  name="colour"
                  value={colour.value}
                  defaultChecked={i === 0}
                  className="peer sr-only"
                />
                <div
                  className={`size-8 border-2 border-black rounded-full ${colour.className}
                      peer-checked:ring-2 peer-checked:ring-offset-2 peer-checked:ring-black`}
                ></div>
              </label>
            ))}
          </div>
        </fieldset>

        <div id="controls" className="flex flex-col mt-auto">
          <div className="flex justify-end gap-6">
            <Button
              type="button"
              variant="neutral"
              commandFor="create-dialog"
              command="close"
            >
              Cancel
            </Button>
            <Button type="submit" variant="success">
              Create
            </Button>
          </div>
        </div>
      </form>
    </dialog>
  );
}
