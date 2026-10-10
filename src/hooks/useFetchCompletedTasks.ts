import { queryOptions, useQuery } from "@tanstack/react-query";

import TaskManager from "../utils/TaskManager";

const taskManager = new TaskManager();

export const getTasks = () =>
  queryOptions({
    queryKey: ["get-completed-tasks"],
    queryFn: taskManager.fetchCompletedTasks,
    staleTime: 1000 * 60, //stops refreshing between home and tasks page within a minute
  });

export function useFetchCompletedTasks() {
  return useQuery(getTasks());
}
