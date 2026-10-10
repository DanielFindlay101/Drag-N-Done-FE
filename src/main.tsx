import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App.tsx";
import { guestRoutes } from "./routes/guestRoutes.tsx";
import { AuthRoutes } from "./routes/authRoutes.tsx";
import { TasksRoute } from "./routes/tasksRoute.tsx";
import AppLayout from "./components/AppLayout.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthRoutes />}>
            <Route element={<AppLayout />}>
              <Route path="/" element={<App />} />
              <Route path="/tasks" element={<TasksRoute />} />
            </Route>
          </Route>
          {guestRoutes}
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools
        initialIsOpen={false}
        position="left"
        buttonPosition="bottom-left"
      />
    </QueryClientProvider>
  </StrictMode>,
);
