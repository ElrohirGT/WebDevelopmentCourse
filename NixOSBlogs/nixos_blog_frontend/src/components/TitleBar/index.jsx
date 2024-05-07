import "./TitleBar.css";

/**
 * @typedef {Object} TitleBarProps
 * @property {()=>void} navigateToLogin
 * @property {string} loginToken
 * @property {()=>void} resetLoginToken
 */

/**
 * @param {TitleBarProps} props
 */
export default function TitleBar({ navigateToLogin, loginToken, resetLoginToken }) {
  return (
    <div className="titleBar">
      <h1>
        Nix<span>OS</span> Blogs
      </h1>
      {loginToken
        ? (
          <div>
            <a className="PrimaryButton" href="/admin">Admin Panel</a>
            <button className="PrimaryButton NegativeButton" type="button" onClick={resetLoginToken}>LogOut</button>
          </div>
        )
        : <button className="PrimaryButton" onClick={navigateToLogin} type="button">Login</button>}
    </div>
  );
}
