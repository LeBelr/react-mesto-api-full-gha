import { Navigate } from "react-router-dom";

export default function ProtectedRoute({component: Component, ...props}) {
  return (
      props.loggedIn === true ? <Component {...props} /> : <Navigate to="/sign-in" replace/>
  )
}