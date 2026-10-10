// import {barY, defineChart} from '@tanstack/charts'
// import {scaleBand} from '@tanstack/charts'
// import {scaleLinear} from "@tanstack/charts"

import { useFetchTasks } from "../hooks/useFetchTasks";

export default function Home() {
  const { data: tasks } = useFetchTasks();
  console.log(tasks);
  return (
    <main className="flex-1 p-6 bg-amber-100 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]">
      <h2 className="text-2xl font-black">Home</h2>
      <p>View a rundown of what you have completed and what's outstanding</p>
    </main>
  );
}
