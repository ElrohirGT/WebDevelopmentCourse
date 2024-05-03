import "./TitleBar.css";

/**
	* @typedef {Object} TitleBarProps
	* @property {()=>void} navigateToLogin
	* @property {()=>void} navigateToAdminView
	* @property {string} loginToken
	*/

/**
 * @param {TitleBarProps} props
 */
export default function TitleBar({ navigateToLogin, navigateToAdminView, loginToken }) {
	return (
		<div className="titleBar">
			<h1>
				Nix<span>OS</span> Blogs
			</h1>
			{loginToken ?
				<button className="PrimaryButton" onClick={navigateToAdminView} type="button">Admin Panel</button>
				:
				<button className="PrimaryButton" onClick={navigateToLogin} type="button">Login</button>
			}
		</div>
	);
}
