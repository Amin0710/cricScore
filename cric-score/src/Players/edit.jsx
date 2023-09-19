import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { updatePlayer } from "../players";

export async function action({ request, params }) {
	const formData = await request.formData();
	const updates = Object.fromEntries(formData);
	await updatePlayer(params.playerId, updates);
	return redirect(`/players/${params.playerId}`);
}

export default function Editplayer() {
	const { player } = useLoaderData();
	const navigate = useNavigate();

	return (
		<Form method="post" id="player-form">
			<p>
				<span>Name</span>
				<input
					placeholder="First"
					aria-label="First name"
					type="text"
					name="first"
					defaultValue={player.first}
				/>
				<input
					placeholder="Last"
					aria-label="Last name"
					type="text"
					name="last"
					defaultValue={player.last}
				/>
			</p>
			<label>
				<span>Twitter</span>
				<input
					type="text"
					name="twitter"
					placeholder="@jack"
					defaultValue={player.twitter}
				/>
			</label>
			<label>
				<span>Avatar URL</span>
				<input
					placeholder="https://example.com/avatar.jpg"
					aria-label="Avatar URL"
					type="text"
					name="avatar"
					defaultValue={player.avatar}
				/>
			</label>
			<label>
				<span>Notes</span>
				<textarea name="notes" defaultValue={player.notes} rows={6} />
			</label>
			<p>
				<button type="submit">Save</button>
				<button
					type="button"
					onClick={() => {
						navigate(-1);
					}}>
					Cancel
				</button>
			</p>
		</Form>
	);
}
