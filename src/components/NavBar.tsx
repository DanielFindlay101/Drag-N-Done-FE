import { useNavigate } from "react-router";
import CreateModal from "./CreateModal";

export default function NavBar() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8787/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) return console.error("Error");

      navigate("/login");
    } catch (err) {
      console.error("Canny log out", err);
    }
  };

  return (
    <>
      <nav className="bg-slate-500 flex justify-between items-center p-4 text-white border-b-2 border-black">
        <div className="p-2 border-2 border-black shadow-[2px_2px_rgba(0,0,0,0.75)] bg-slate-300">
          <h1 className="text-2xl text-black ">Drag N Done</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            command="show-modal"
            commandFor="create-dialog"
            className="bg-cyan-400 p-2 border-2 border-black shadow-[2px_2px_rgba(0,0,0,0.75)] text-black hover:cursor-pointer
                        transition-all duration-150 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none
                        active:bg-cyan-500"
          >
            Create
          </button>
          <button
            onClick={handleLogout}
            className="bg-slate-400 p-2 border-2 border-black shadow-[2px_2px_rgba(0,0,0,0.75)] text-black hover:cursor-pointer
                        transition-all duration-150 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none
                        active:bg-cyan-500"
          >
            {" "}
            Log out
          </button>
        </div>
      </nav>
      <CreateModal />
    </>
  );
}
