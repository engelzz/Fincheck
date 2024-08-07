import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthLayout } from "../ui/layouts/auth.layout";
import { Dashboard } from "../ui/pages/Dashboard/dashboard";
import { Login } from "../ui/pages/Login/login";
import { Register } from "../ui/pages/Register/resgister";
import { AuthGuard } from "./authGuard";

export function Router() {
  return (
    <BrowserRouter>
     <Routes>
      <Route element={<AuthGuard isPrivate={false} />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
        </Route> 
      </Route>

      <Route element={<AuthGuard isPrivate />}>
        <Route path="/" element={<Dashboard />}/>              
      </Route>
    </Routes>
    </BrowserRouter>
  );
}