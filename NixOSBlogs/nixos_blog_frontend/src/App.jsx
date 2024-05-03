import { useState } from "react";
import "./App.css";
import MainView from "src/views/MainView";

export const ROUTES = {
	home: "HOME",
	admin: "ADMIN",
	blogForm: "BLOGFORM",
	blogDetails: "DETAILS",
};

export default function App() {
	const [currentRoute, setCurrentRoute] = useState(ROUTES.home);
	const navigateToLogin = () => {
		setCurrentRoute(ROUTES.admin)
	}

	const routeToComponentMapper = {};
	routeToComponentMapper[ROUTES.home] = <MainView navigateToLogin={navigateToLogin} />;

	return routeToComponentMapper[currentRoute]
}
