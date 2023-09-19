import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const PublicOnlyRoutes = ({ children }) => {
	const { user } = useContext(AuthContext);
	const location = useLocation();

	if (!user) {
		return children;
	}

	return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default PublicOnlyRoutes;
