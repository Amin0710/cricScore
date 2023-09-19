import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getPlayers(query) {
	let players = await localforage.getItem("players");
	if (!players) players = [];
	if (query) {
		players = matchSorter(players, query, { keys: ["first", "last"] });
	}
	return players.sort(sortBy("last", "createdAt"));
}

export async function createPlayer() {
	let id = Math.random().toString(36).substring(2, 9);
	let player = { id, createdAt: Date.now() };
	let players = await getPlayers();
	players.unshift(player);
	await set(players);
	return player;
}

export async function getPlayer(id) {
	let players = await localforage.getItem("players");
	let player = players.find((player) => player.id === id);
	return player ?? null;
}

export async function updatePlayer(id, updates) {
	let players = await localforage.getItem("players");
	let player = players.find((player) => player.id === id);
	if (!player) throw new Error("No player found for", id);
	Object.assign(player, updates);
	await set(players);
	return player;
}

export async function deleteplayer(id) {
	let players = await localforage.getItem("players");
	let index = players.findIndex((player) => player.id === id);
	if (index > -1) {
		players.splice(index, 1);
		await set(players);
		return true;
	}
	return false;
}

function set(players) {
	return localforage.setItem("players", players);
}
