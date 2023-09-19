import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import FAQ from "../Pages/OtherPages/FAQ";
import Signup from "../Pages/Signup/Signup";
// import PrivateRoute from "./PrivetRoutes";
import PublicOnlyRoutes from "./PublicOnlyRoutes";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Main></Main>,
		errorElement: <ErrorPage></ErrorPage>,
		children: [
			{
				path: "/",
				element: <Home></Home>,
			},
			{
				path: "login",
				element: (
					<PublicOnlyRoutes>
						<Login></Login>
					</PublicOnlyRoutes>
				),
			},
			{
				path: "signup",
				element: (
					<PublicOnlyRoutes>
						<Signup></Signup>
					</PublicOnlyRoutes>
				),
			},
			{
				path: "faq",
				element: <FAQ></FAQ>,
			},
		],
	},
]);

export default router;
