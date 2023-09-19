/* eslint-disable react/prop-types */
import { Form, useLoaderData, useFetcher } from "react-router-dom";
import { getPlayer, updatePlayer } from "../players";

export async function loader({ params }) {
	const player = await getPlayer(params.playerId);
	if (!player) {
		throw new Response("", {
			status: 404,
			statusText: "Player Not Found",
		});
	}
	return { player };
}

export async function action({ request, params }) {
	let formData = await request.formData();
	return updatePlayer(params.playerId, {
		favorite: formData.get("favorite") === "true",
	});
}

export default function Player() {
	const { player } = useLoaderData();

	return (
		<div id="player">
			<div>
				<img key={player.avatar} src={player.avatar || null} />
			</div>

			<div>
				<h1>
					{player.first || player.last ? (
						<>
							{player.first} {player.last}
						</>
					) : (
						<i>No Name</i>
					)}{" "}
					<Favorite player={player} />
				</h1>

				{player.twitter && (
					<p>
						<a
							target="_blank"
							href={`https://twitter.com/${player.twitter}`}
							rel="noreferrer">
							{player.twitter}
						</a>
					</p>
				)}

				{player.notes && <p>{player.notes}</p>}

				<div>
					<Form action="edit">
						<button type="submit">Edit</button>
					</Form>
					<Form
						method="post"
						action="destroy"
						onSubmit={(event) => {
							if (!confirm("Please confirm you want to delete this record.")) {
								event.preventDefault();
							}
						}}>
						<button type="submit">Delete</button>
					</Form>
				</div>
			</div>
		</div>
	);
}

function Favorite({ player }) {
	const fetcher = useFetcher();
	// yes, this is a `let` for later
	let favorite = player.favorite;
	if (fetcher.formData) {
		favorite = fetcher.formData.get("favorite") === "true";
	}

	return (
		<fetcher.Form method="post">
			<button
				name="favorite"
				value={favorite ? "false" : "true"}
				aria-label={favorite ? "Remove from favorites" : "Add to favorites"}>
				{favorite ? "★" : "☆"}
			</button>
		</fetcher.Form>
	);
}
