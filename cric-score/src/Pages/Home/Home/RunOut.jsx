const RunOut = (runoutBye, handleRunoutByeChange) => {
	return (
		<div>
			<h1>
				Please make sure, if there is a{" "}
				<span className="text-red-500 font-bold">Run out</span> close this and
				open the runout modal.
			</h1>

			<table className="min-w-full border-collapse mt-2">
				<thead>
					<tr>
						<th className="border p-2">
							Which side did the new batsman come to? <br />
							<span className="text-red-500 font-bold">
								This is really important for record keeping, choose carefully!
							</span>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="border p-2" colSpan="3">
							<label>
								<input type="radio" id="keeperSide" />
								Keeper side
							</label>
							<label>
								<input type="radio" id="bowlerSide" />
								Bowler side
							</label>
						</td>
					</tr>
				</tbody>
			</table>
			<table className="min-w-full border-collapse mt-2">
				<thead>
					<tr>
						<th className="border p-1">Bye run?</th>
						<th className="border p-1">Runs before runout</th>
						<th className="border p-1">Wide/NO Ball?</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="border p-1">
							<select
								id="runoutByeDropdown"
								value={runoutBye}
								onChange={handleRunoutByeChange}
								className="dropdown bg-gray-200 p-1 m-1 rounded">
								<option value="0">No</option>
								<option value="bye">Yes, Bye</option>
							</select>
						</td>
						<td className="border p-1">
							<select
								id="runoutRunsDropdown"
								className="dropdown bg-gray-200 p-1 m-1 rounded">
								<option value="0" disabled={runoutBye === "bye"}>
									0
								</option>
								<option value="1" selected={runoutBye === "bye"}>
									1
								</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
							</select>
						</td>
						<td className="border p-1">
							<select
								id="runoutWideNoDropdown"
								className="dropdown bg-gray-200 p-1 m-1 rounded">
								<option value="0">None</option>
								<option value="wide">Wide</option>
								<option value="noball">No Ball</option>
							</select>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default RunOut;
