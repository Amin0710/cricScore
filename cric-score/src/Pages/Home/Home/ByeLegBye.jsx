const ByeLegBye = () => {
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
						<th className="border p-1">Runs</th>
						<th className="border p-1">Wide/NO Ball</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="border p-1">
							<select
								id="byeRunsDropdown"
								className="dropdown bg-gray-200 p-1 m-1 rounded">
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
								<option value="6">6</option>
							</select>
						</td>
						<td className="border p-1">
							<select
								id="byeWideNoDropdown"
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

export default ByeLegBye;
