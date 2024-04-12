/**
	* @typedef {Object} LoginData
	* @property {string} username
	*/

import { useState } from "react";

const CREDENTIALS = {
	username: "user",
	password: "1234",
}

/**
	* @param {Object} props 
	* @param {(data: LoginData)=>void} props.onLogin 
	*/
export default function Login({ onLogin }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const tryLogin = () => {
		setError("");
		if (username !== CREDENTIALS.username || password !== CREDENTIALS.password) {
			setError("Invalid username or password");
			return;
		}

		onLogin({
			username
		})
	};

	return <div>
		<h1>LOG IN</h1>
		<input type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
		<input type="text" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
		{
			error.length === 0 ? null : <p>{error}</p>
		}
		<button onClick={tryLogin}>Log In</button>
	</div>
}
