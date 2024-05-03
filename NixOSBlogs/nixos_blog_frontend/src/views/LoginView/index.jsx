import "./Login.css"

export default function LoginView() {
	return <div className="LoginViewContainer">
		<div className="LoginContainer">
			<h2>Login</h2>
			<input placeholder="Username:" />
			<input placeholder="Password:" />
			<button className="PrimaryButton">Log In</button>
		</div>
	</div>
}
