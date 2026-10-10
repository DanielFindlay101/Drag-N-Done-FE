import { PanelLeftOpen, PanelLeftClose, House, ListTodo } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";

const pages = [
  { icon: <House />, title: "Home", to: "/" },
  { icon: <ListTodo />, title: "Tasks", to: "/tasks" },
];

export default function SidePanel() {
  const [panelOpen, setPanelOpen] = useState(true);
  return (
    <div
      className={`${panelOpen ? "w-50 translate-x-0 " : "w-16 flex flex-col items-center -translate-x-full"}
       transition-transform duration-300 ease-in-out transform translate-x-0
       h-full bg-slate-400 border-r-2 border-2-black`}
    >
      <div className="">
        {panelOpen ? (
          <PanelLeftClose
            className="ml-auto mt-2 mr-2 hover:cursor-pointer"
            onClick={() => setPanelOpen(false)}
          />
        ) : (
          <PanelLeftOpen
            className="ml-auto mt-2 hover:cursor-pointer"
            onClick={() => setPanelOpen(true)}
          />
        )}
      </div>

      <div className="flex flex-col gap-4 mt-6 ">
        {pages.map((page) => (
          <NavLink
            key={page.to}
            to={page.to}
            end
            className={({ isActive }) =>
              `flex gap-2 py-2 border-2  p-1 ${panelOpen ? "pl-3 mx-2" : ""} ${
                isActive ? "bg-slate-300 border-black" : "border-transparent"
              }`
            }
          >
            <span>{page.icon}</span>
            {panelOpen && <span>{page.title}</span>}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
