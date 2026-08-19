import { useQuery } from "@tanstack/react-query";

const fetchSession = async () => {
  const reponse = await fetch("http://localhost:8787/auth/me", {
    credentials: "include",
  });
  if (reponse.status === 401) return null;
  if (!reponse.ok) throw new Error("Failed to fetch session");

  const { user } = await reponse.json();
  return user as { id: string; email: string };
};

export const useSession = () => {
  return useQuery({
    queryKey: ["session"],
    queryFn: fetchSession,
    retry: false,
  });
};
