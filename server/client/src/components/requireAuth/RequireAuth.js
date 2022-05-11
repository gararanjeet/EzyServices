import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useCookies } from "react-cookie";

export function RequireAuth({ allowed }) {
  const [cookie] = useCookies();
  const location = useLocation();
  console.log(cookie[allowed], allowed);
  console.log(location);
  return cookie[allowed] === "true" ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} state={{ from: location }} replace />
  );
}

export function HomeAuth() {
  const [cookie] = useCookies();
  const { manager, serviceProvider } = cookie;
  const location = useLocation();
  console.log("homeauth", location);
  return manager ? (
    <Navigate to={"/owner"} state={{ from: location }} replace />
  ) : serviceProvider ? (
    <Navigate to={"/acceptedRequests"} state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}
