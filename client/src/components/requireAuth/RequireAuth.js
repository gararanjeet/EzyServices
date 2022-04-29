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

export function UserAuth() {
  const { auth } = useAuth();
  const location = useLocation();
  return auth.user ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} state={{ from: location }} replace />
  );
}

export function ManagerAuth() {
  const { auth } = useAuth();
  console.log(auth);
  const location = useLocation();
  console.log(location);
  return auth.manager ? (
    <Outlet />
  ) : (
    <Navigate to={"/owner"} state={{ from: location }} replace />
  );
}

export function ServiceProviderAuth() {
  const { auth } = useAuth();
  const location = useLocation();
  return auth.serviceProvider ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} state={{ from: location }} replace />
  );
}

export function PartialUserAuth() {
  const { auth } = useAuth();
  const location = useLocation();
  return auth.user || auth.logedin === false ? (
    <Outlet />
  ) : (
    <Navigate to={"/owner"} state={{ from: location }} replace />
  );
}
