/* eslint-disable react/prop-types */
const ScoreChangePopUp = ({
	over,
	ball,
	ballToChangeIsExtra,
	changeType,
	handleTypeChange,
}) => {
	return (
		<div>
			<h1>
				Please make sure there are{" "}
				<span className="text-green-500 font-bold">6 valid balls</span> in the
				over.
			</h1>
			<h1>
				You are changing over:{" "}
				<span className="text-red-500 font-bold">{over}</span> ball:{" "}
				<span className="text-red-500 font-bold">{ball}</span>
			</h1>
			<table className="min-w-full border-collapse mt-2">
				<thead>
					<tr>
						<th className="border p-2">Add/Delete/Change</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="border p-2" colSpan="3">
							<select
								id="changeType"
								className="dropdown bg-gray-200 p-1 m-1 rounded"
								value={changeType}
								onChange={handleTypeChange}>
								<option value="change">Change</option>
								<option value="add">Add</option>
								<option value="delete" disabled={!ballToChangeIsExtra}>
									Delete
								</option>
							</select>
						</td>
					</tr>
				</tbody>
			</table>
			<table className="min-w-full border-collapse">
				<thead>
					<tr>
						<th className="border p-1">Runs</th>
						<th className="border p-1">Wide/NO</th>
						<th className="border p-1">Wicket</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="border p-1">
							<select
								id="runsDropdown"
								className="dropdown bg-gray-200 p-1 m-1 rounded">
								<option value="0">0</option>
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
								id="wideNoDropdown"
								className="dropdown bg-gray-200 p-1 m-1 rounded">
								<option
									value="0"
									disabled={changeType === "add" || changeType === "delete"}>
									None
								</option>
								<option
									value="wide"
									disabled={!ballToChangeIsExtra && changeType === "change"}>
									Wide
								</option>
								<option
									value="noball"
									disabled={!ballToChangeIsExtra && changeType === "change"}>
									No Ball
								</option>
							</select>
						</td>
						<td className="border p-1">
							<select
								id="wicketDropdown"
								className="dropdown bg-gray-200 p-1 m-1 rounded">
								<option value="0">NO Wicket</option>
								<option value="1">OUT</option>
								{/* <option value="2">Run OUT</option> */}
							</select>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default ScoreChangePopUp;
