import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import AuthProvider from "./Providers/AuthProvider";
import router from "./Routes/Routes.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	</React.StrictMode>
);

// import React from "react";
// import ReactDOM from "react-dom/client";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import "./index.css";
// import Root, {
// 	loader as rootLoader,
// 	action as rootAction,
// } from "./routes/root";
// import ErrorPage from "./error-page";
// import Player, {
// 	loader as playerLoader,
// 	action as playerAction,
// } from "./routes/players";
// import Editplayer, { action as editAction } from "./routes/edit";
// import { action as destroyAction } from "./routes/destroy";
// import Index from "./routes/index";

// const router = createBrowserRouter([
// 	{
// 		path: "/",
// 		element: <Root />,
// 		loader: rootLoader,
// 		action: rootAction,
// 		errorElement: <ErrorPage />,
// 		children: [
// 			{
// 				errorElement: <ErrorPage />,
// 				children: [
// 					{ index: true, element: <Index /> },
// 					{
// 						path: "players/:playerId",
// 						element: <Player />,
// 						loader: playerLoader,
// 						action: playerAction,
// 					},
// 					{
// 						path: "players/:playerId/edit",
// 						element: <Editplayer />,
// 						loader: playerLoader,
// 						action: editAction,
// 					},
// 					{
// 						path: "players/:playerId/destroy",
// 						action: destroyAction,
// 						errorElement: <div>Oops! There was an error.</div>,
// 					},
// 				],
// 			},
// 		],
// 	},
// ]);

// ReactDOM.createRoot(document.getElementById("root")).render(
// 	<React.StrictMode>
// 		<RouterProvider router={router} />
// 	</React.StrictMode>
// );
