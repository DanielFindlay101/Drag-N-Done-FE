import { Outlet } from "react-router";
import NavBar from "./NavBar";
import SidePanel from "./SidePanel";

export default function AppLayout() {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <NavBar />
      <div className="flex h-full">
        <SidePanel />
        <Outlet />
      </div>
    </div>
  );
}
