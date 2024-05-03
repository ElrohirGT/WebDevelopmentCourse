import "./TitleBar.css"

/**
	* @param {Object} props 
	* @param {()=>void} props.navigateToLogin 
	*/
export default function TitleBar({ navigateToLogin }) {
	return <div className="titleBar">
		<h1>Nix<span>OS</span> Blogs</h1>
		<button onClick={navigateToLogin}>Login</button>
	</div>
}
