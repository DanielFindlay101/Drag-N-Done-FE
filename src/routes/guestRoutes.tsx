import { Route } from "react-router";
import Register from "../pages/Register.tsx";
import Login from "../pages/Login.tsx";

export const guestRoutes = (
  <>
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
  </>
);
