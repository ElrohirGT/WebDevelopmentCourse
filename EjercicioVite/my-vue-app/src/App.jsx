import { useState } from 'react'
import NotFound from './components/NotFound';
import Home from './components/Home';
import Login from './components/Login';
import { ROUTE_NAMES } from './lib';


/**
	* @param {string} route 
	* @returns {string} The found route or `ROUTE_NAMES.notFound`
	*/
const computeDefaultRoute = (route) => ROUTE_NAMES[route] ?? ROUTE_NAMES["/404"];

function App() {
	const windowRoute = window.location.pathname;
	console.log(windowRoute);
	const defaultRoute = computeDefaultRoute(windowRoute);
	const [route, setRoute] = useState(defaultRoute);

	const [loginData, setLoginData] = useSessionStorage("loginData");

	/**
		* @param {import('./components/Login').LoginData} loginData
		*/
	const onLogin = (loginData) => {
		setLoginData(loginData);
		setRoute(ROUTE_NAMES["/"]);
	};

	const onLoginRedirect = () => {
		setLoginData(null);
		setRoute(ROUTE_NAMES["/login"]);
	};

	const routes = {};
	routes[ROUTE_NAMES["/404"]] = <NotFound />;
	routes[ROUTE_NAMES["/"]] = <Home data={loginData} onLoginRedirect={onLoginRedirect} />;
	routes[ROUTE_NAMES["/login"]] = <Login onLogin={onLogin} />;

	return (
		<>
			{routes[route]}
		</>
	)
}

/**
	* Custom REACT hook for using session storage.
	*
	* @param {string} key The key to use in session storage.
	*/
const useSessionStorage = (key) => {
	const [state, setState] = useState(sessionStorage.getItem(key));

	console.log("The login data is: ", JSON.parse(state));

	return [JSON.parse(state), (newValue) => {
		const json = JSON.stringify(newValue);
		sessionStorage.setItem(key, json)
		setState(json);
	}];
}

export default App
