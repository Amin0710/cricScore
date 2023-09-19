import { redirect } from "react-router-dom";
import { deleteplayer } from "../players";

export async function action({ params }) {
	await deleteplayer(params.playerId);
	return redirect("/");
}
