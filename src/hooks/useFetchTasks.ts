import { queryOptions, useQuery } from "@tanstack/react-query";

import TaskManager from "../utils/TaskManager";

const taskManager = new TaskManager();

export const getTasks = () =>
  queryOptions({
    queryKey: ["get-tasks"],
    queryFn: taskManager.fetchTasks,
  });

export function useFetchTasks() {
  return useQuery(getTasks());
}
