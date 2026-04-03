import Spinner from "../../ai/components/Spinner";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Spinner/>

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default Protected;