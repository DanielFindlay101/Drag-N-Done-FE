import { Navigate, Outlet } from "react-router";
import { useSession } from "../hooks/useSession";

export const AuthRoutes = () => {
  const { data: user, isLoading } = useSession();

  if (isLoading) return null;
  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
};
