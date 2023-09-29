import { Navigate } from "react-router-dom";
import { HOME_ROUTE } from "../../utils/RouteConstants";

export default function ProtectedRoute({
  element: Component,
  loggedIn,
  ...props
})
{
  return (
    loggedIn
      ? <Component {...props} />
      : <Navigate to={HOME_ROUTE} replace />
  );
};
