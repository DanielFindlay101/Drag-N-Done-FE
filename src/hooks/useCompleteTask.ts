import {
  mutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import TaskManager from "../utils/TaskManager";
import { getTasks } from "./useFetchTasks";

const taskManager = new TaskManager();

export const completeTask = () =>
  mutationOptions({
    mutationKey: ["complete-task"],
    mutationFn: taskManager.completeTask,
  });

export function useCompleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    ...completeTask(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getTasks().queryKey });
      queryClient.invalidateQueries({ queryKey: ["get-completed-tasks"] });
    },
  });
}
