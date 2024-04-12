/**
	* @param {Object} props 
	* @param {import("../Login").LoginData} props.data 
	*/
export default function Home({ data, onLoginRedirect }) {
	console.log("HOME DATA: ", data);

	return <div>
		<h1>HOME</h1>
		{
			!data ?
				<div>
					<p>Please Login first!</p>
					<button onClick={onLoginRedirect} >Go to login!</button>
				</div>
				:
				<div>
					<p>Logged in as {data.username}!</p>
					<button onClick={onLoginRedirect} >Log Out!</button>
				</div>
		}
	</div>
}
