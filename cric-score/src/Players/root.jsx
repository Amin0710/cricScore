import {
	Outlet,
	NavLink,
	useLoaderData,
	Form,
	redirect,
	useNavigation,
	useSubmit,
} from "react-router-dom";
import { getPlayers, createPlayer } from "../players";
import { useEffect } from "react";

export async function loader({ request }) {
	const url = new URL(request.url);
	const search = url.searchParams.get("search");
	const players = await getPlayers(search);
	return { players, search };
}

export async function action() {
	const player = await createPlayer();
	return redirect(`/players/${player.id}/edit`);
}

export default function Root() {
	const { players, search } = useLoaderData();
	const navigation = useNavigation();
	const submit = useSubmit();

	const searching =
		navigation.location &&
		new URLSearchParams(navigation.location.search).has("search");

	useEffect(() => {
		document.getElementById("q").value = search;
	}, [search]);

	return (
		<>
			<div id="sidebar">
				<h1>by Aminano</h1>
				<div>
					<Form id="search-form" role="search">
						<input
							id="q"
							className={searching ? "loading" : ""}
							aria-label="Search players"
							placeholder="Search"
							type="search"
							name="search"
							defaultValue={search}
							onChange={(event) => {
								const isFirstSearch = search == null;
								submit(event.currentTarget.form, {
									replace: !isFirstSearch,
								});
							}}
						/>
						<div id="search-spinner" aria-hidden hidden={!searching} />
						<div className="sr-only" aria-live="polite"></div>
					</Form>
					<Form method="post">
						<button type="submit">New</button>
					</Form>
				</div>
				<nav>
					{players.length ? (
						<ul>
							{players.map((player) => (
								<li key={player.id}>
									<NavLink
										to={`players/${player.id}`}
										className={({ isActive, isPending }) =>
											isActive ? "active" : isPending ? "pending" : ""
										}>
										{player.first || player.last ? (
											<>
												{player.first} {player.last}
											</>
										) : (
											<i>No Name</i>
										)}{" "}
										{player.favorite && <span>★</span>}
									</NavLink>
								</li>
							))}
						</ul>
					) : (
						<p>
							<i>No players</i>
						</p>
					)}
				</nav>
			</div>
			<div
				id="detail"
				className={navigation.state === "loading" ? "loading" : ""}>
				<Outlet />
			</div>
		</>
	);
}
