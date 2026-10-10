import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import Button from "../components/Button";

export type User = {
  email: string;
  password: string;
  age?: number;
};

export default function Register() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleRegister = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch("http://localhost:8787/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        console.error("Error");
        return;
      }

      await queryClient.invalidateQueries({ queryKey: ["session"] });
      navigate("/");
    } catch (err) {
      console.error("Cannot register", err);
    }
  };

  return (
    <div className="flex w-full h-screen flex-1 flex-col items-center justify-center gap-12 overflow-hidden bg-amber-100 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]">
      <h1 className="text-2xl ">Drag n' Done</h1>

      <main className="p-6 bg-indigo-500 w-4/5 lg:w-1/3   border-2 border-black shadow-[2px_2px_rgba(0,0,0,0.75)]">
        <form
          action=""
          className="space-y-5 flex flex-col m-auto justify-center"
          onSubmit={handleRegister}
        >
          <label htmlFor="title" className="flex flex-col">
            Email
            <input
              type="email"
              placeholder="Enter your email..."
              className="inputs"
              name="email"
              required
            />
          </label>

          <label htmlFor="description" className="flex flex-col">
            Password
            <input
              type="password"
              placeholder="Enter your password..."
              className="inputs"
              name="password"
              required
            />
          </label>

          <div className="flex flex-col mt-auto">
            <Button type="submit" variant="success" className="mt-2">
              Register
            </Button>
          </div>
        </form>
        <p className="mx-auto text-slate-200 w-full mt-4">
          Already have an account?{" "}
          <Link to="/login" className="underline hover:cursor-pointer">
            Log in{" "}
          </Link>
        </p>
      </main>
    </div>
  );
}
