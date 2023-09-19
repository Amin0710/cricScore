import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const PrivateRoute = ({ children }) => {
	const { user, loading } = useContext(AuthContext);
	const location = useLocation();

	if (loading) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen">
				<div className="container my-5 py-5">
					<div className="flex flex-col items-center">
						<progress className="progress w-56 bg-red-500 mb-4"></progress>
						<progress className="progress w-56 bg-blue-500 mb-4"></progress>
						<progress className="progress w-56 bg-white mb-4"></progress>
						<progress className="progress w-56 bg-black mb-4"></progress>
						<progress className="progress w-56 bg-green-500 mb-4"></progress>
						<progress className="progress w-56 bg-yellow-500 mb-4"></progress>
					</div>
				</div>
			</div>
		);
	}

	if (user) {
		return children;
	}

	return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
