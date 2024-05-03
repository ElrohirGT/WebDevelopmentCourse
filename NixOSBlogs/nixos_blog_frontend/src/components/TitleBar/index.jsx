import "./TitleBar.css";

/**
	* @typedef {Object} TitleBarProps
	* @property {()=>void} navigateToLogin
	* @property {string} loginToken
	*/

/**
 * @param {TitleBarProps} props
 */
export default function TitleBar({ navigateToLogin, loginToken }) {
	return (
		<div className="titleBar">
			<h1>
				Nix<span>OS</span> Blogs
			</h1>
			{loginToken ?
				<a className="PrimaryButton" href="/admin">Admin Panel</a>
				:
				<button className="PrimaryButton" onClick={navigateToLogin} type="button">Login</button>
			}
		</div>
	);
}
