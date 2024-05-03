import { useEffect, useState } from "react";
import "./App.css";
import MainView from "src/views/MainView";
import { AdminView } from "src/views/AdminView";
import { LoginView } from "src/views/LoginView";

export const ROUTES = {
	home: "HOME",
	login: "LOGIN",
	admin: "ADMIN",
	blogForm: "BLOGFORM",
	blogDetails: "DETAILS",
};

export default function App() {
	const [currentRoute, setCurrentRoute] = useState(ROUTES.home);
	const navigateToAdminView = () => {
		setCurrentRoute(ROUTES.admin)
	}
	const navigateToLogin = () => {
		setCurrentRoute(ROUTES.login)
	}

	useEffect(() => {
		const currentUrlRoute = window.location.pathname;
		if (currentUrlRoute === "/admin") {
			navigateToAdminView()
		}
	}, [])


	const routeToComponentMapper = {};
	routeToComponentMapper[ROUTES.home] = <MainView navigateToLogin={navigateToLogin} />;
	routeToComponentMapper[ROUTES.login] = <LoginView />
	routeToComponentMapper[ROUTES.admin] = <AdminView />;

	return routeToComponentMapper[currentRoute]
}
