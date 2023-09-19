import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/Cricketscoredcard.png";
import { AuthContext } from "../../Providers/AuthProvider";
import google from "../../assets/google.png";
import fb from "../../assets/fb.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTitle from "../../Shared/Hooks/useTitle";

const Login = () => {
	useTitle("Login");
	const [error, setError] = useState("");
	const {
		signIn,
		handleFBLogin,
		handleGoogleLogin,
		setLoading,
		googleError,
		loading,
	} = useContext(AuthContext);
	const location = useLocation();
	const navigate = useNavigate();
	const from = location.state?.from?.pathname || "/";

	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		if (from !== "/") {
			if (mounted) {
				toast(
					<div className="alert alert-error">
						<div>
							<span>You have to log in first to view details.</span>
						</div>
					</div>
				);
			}
		}
	}, [from, mounted]);

	useEffect(() => {
		setMounted(true);
	}, []);

	const handleGoogleLoginLocation = () =>
		handleGoogleLogin().then(() => {
			navigate(from, { replace: true });
		});

	const handleFBLoginLocation = () =>
		handleFBLogin().then(() => {
			navigate(from, { replace: true });
		});

	const handleLogin = (event) => {
		event.preventDefault();
		const form = event.target;
		const email = form.email.value;
		const password = form.password.value;

		signIn(email, password)
			.then(() => {
				navigate(from, { replace: true });
			})
			.catch((error) => {
				if (error) {
					setLoading(false);
				}

				if (error.code === "auth/user-not-found") {
					setError("User not found. Please Sign up first.");
					return;
				}
				if (error.code === "auth/invalid-email") {
					setError("Please type a valid E-mail");
					return;
				}
				if (error.code === "auth/wrong-password") {
					setError("Wrong password. Please try again.");
					return;
				}

				setError(
					error.message || "Something went wrong. Please try again later."
				);
			});
	};
	return (
		<div className="hero min-h-screen bg-base-200">
			<div className="hero-content flex-col lg:flex-row gap-20">
				<div className="text-center lg:text-left">
					<h1 className="text-5xl font-bold mb-5">Login now!</h1>
					<h1 className="text-xl font-bold mb-5">or do this.</h1>
					{loading ? (
						<div className="flex flex-col items-center">
							<progress className="progress w-56 bg-red-500 mb-4"></progress>
							<progress className="progress w-56 bg-blue-500 mb-4"></progress>
							<progress className="progress w-56 bg-white mb-4"></progress>
							<progress className="progress w-56 bg-black mb-4"></progress>
							<progress className="progress w-56 bg-green-500 mb-4"></progress>
							<progress className="progress w-56 bg-yellow-500 mb-4"></progress>
						</div>
					) : (
						<img
							src={logo}
							height="400px"
							width="400px"
							alt=""
							className="rounded block"
						/>
					)}
				</div>
				<div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
					<div className="card-body">
						<form onSubmit={handleLogin}>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Email</span>
								</label>
								<input
									type="text"
									placeholder="email"
									name="email"
									className="input input-bordered"
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Password</span>
								</label>
								<input
									type="password"
									placeholder="password"
									name="password"
									className="input input-bordered"
								/>
								<label className="label">
									<a href="#" className="label-text-alt link link-hover">
										Forgot password?
									</a>
								</label>
							</div>
							<div className="form-control mt-6">
								<input
									className="btn btn-primary"
									type="submit"
									value="Login"
								/>
							</div>
						</form>
						<button
							className="btn flex items-center"
							onClick={handleGoogleLoginLocation}>
							Login with
							<img src={google} alt="" className="ml-1 btn-icon w-5 h-5" />
						</button>
						<button
							className="btn items-center hidden"
							onClick={handleFBLoginLocation}>
							Login with
							<img src={fb} alt="" className="ml-1 btn-icon w-5 h-5" />
						</button>
						<p className="my-4 text-center">
							New to Boredom Busters
							<Link className="text-purple-600 font-bold" to="/signup">
								{" "}
								Sign Up
							</Link>{" "}
						</p>
					</div>
					<p className="text-red-700 text-center">{error || googleError}</p>
				</div>
			</div>
			<ToastContainer
				position="top-right"
				autoClose={10000}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				toastStyle={{
					backgroundColor: "transparent",
				}}
			/>
		</div>
	);
};

export default Login;
