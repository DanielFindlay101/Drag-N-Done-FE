export default class TaskManager {
  public fetchTasks = async () => {
    const response = await fetch("http://localhost:8787/todos", {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Cannot fetch the tasks");
    }
    return response.json();
  };

  public completeTask = async (taskId: string) => {
    const response = await fetch(`http://localhost:8787/todos/${taskId}`, {
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
}
