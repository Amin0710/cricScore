import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Cricketscoredcard.png";
import { AuthContext } from "../../Providers/AuthProvider";
import useTitle from "../../Shared/Hooks/useTitle";

const Signup = () => {
	useTitle("Sign up");

	const [error, setError] = useState("");
	const { createUser, loading } = useContext(AuthContext);
	const navigate = useNavigate();
	const [accepted, setAccepted] = useState(false);

	const handleSignup = (event) => {
		event.preventDefault();
		const form = event.target;
		const name = form.name.value;
		const photo = form.photo.value;
		const email = form.email.value;
		const password = form.password.value;
		const confirm = form.confirm.value;

		setError("");

		if (password !== confirm) {
			setError("Your password did not match");
			return;
		} else if (password.length < 6) {
			setError("password must be 6 characters or longer");
			return;
		} else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(password)) {
			setError(
				"Password must contain at least one symbol, one uppercase letter, one lowercase letter, and one number"
			);
			return;
		}

		createUser(email, password, { displayName: name, photoURL: photo })
			.then(() => {
				navigate("/login", { replace: true });
			})
			.catch((error) => {
				console.log(error);
				if (error.code === "auth/email-already-in-use") {
					setError("User already exists. Please login.");
					return;
				}
				setError(
					error.message || "Something went wrong. Please try again later."
				);
			});

		// Reset the form
		for (const input of form.querySelectorAll("input")) {
			input.value = "";
		}
	};

	const handleAccepted = (event) => {
		setAccepted(event.target.checked);
	};

	return (
		<div className="hero min-h-screen bg-base-200">
			<div className="hero-content flex-col lg:flex-row gap-20">
				<div className="text-center lg:text-left">
					<h1 className="text-5xl font-bold mb-5">Sign Up!</h1>
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
						<form onSubmit={handleSignup}>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Name</span>
								</label>
								<input
									type="text"
									placeholder="name"
									name="name"
									className="input input-bordered"
									required
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Email</span>
								</label>
								<input
									type="text"
									placeholder="email"
									name="email"
									className="input input-bordered"
									required
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Photo URL</span>
								</label>
								<input
									type="text"
									placeholder="http://www.example.com/"
									name="photo"
									className="input input-bordered"
									required
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
									required
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Confirm Password</span>
								</label>
								<input
									type="password"
									placeholder="confirm password"
									name="confirm"
									className="input input-bordered"
									required
								/>
							</div>
							<div className="flex items-center">
								<input
									type="checkbox"
									name="accept"
									id="acceptCheckbox"
									className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
									onClick={handleAccepted}
								/>
								<label htmlFor="acceptCheckbox" className="ml-2 text-sm">
									Accept Terms and Conditions
								</label>
							</div>
							<div className="form-control mt-6">
								<input
									disabled={!accepted}
									className="btn btn-primary"
									type="submit"
									value="Sign up"
								/>
							</div>
						</form>
						<p className="my-4 text-center">
							Already have an account
							<Link className="text-purple-600 font-bold" to="/login">
								{" "}
								Login
							</Link>{" "}
						</p>
					</div>
					<p className="text-red-700 text-center">{error}</p>
				</div>
			</div>
		</div>
	);
};

export default Signup;
