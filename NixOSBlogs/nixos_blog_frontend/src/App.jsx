import { useEffect, useState } from "react";
import "./App.css";
import MainView from "src/views/MainView";
import AdminView from "src/views/AdminView";
import LoginView from "src/views/LoginView";
import BlogDetailsView from "./views/BlogDetailsView";

export const ROUTES = {
	home: "HOME",
	login: "LOGIN",
	admin: "ADMIN",
	blogForm: "BLOGFORM",
	blogDetails: "DETAILS",
};

export default function App() {
	const [currentRoute, setCurrentRoute] = useState(ROUTES.home);
	const [currentBlogPreview, setCurrentBlog] = useState(undefined);

	const navigateToAdminView = () => {
		setCurrentRoute(ROUTES.admin)
	}
	const navigateToLogin = () => {
		setCurrentRoute(ROUTES.login)
	}
	const navigateToBlogDetails = (blogPreview) => {
		setCurrentBlog(blogPreview)
		setCurrentRoute(ROUTES.blogDetails)
	}
	const navigateToMainView = () => {
		setCurrentBlog(undefined)
		setCurrentRoute(ROUTES.home)
	}

	useEffect(() => {
		const currentUrlRoute = window.location.pathname;
		if (currentUrlRoute === "/admin") {
			navigateToAdminView()
		}
	}, [])


	const routeToComponentMapper = {};
	routeToComponentMapper[ROUTES.home] = <MainView navigateToLogin={navigateToLogin} navigateToBlogDetails={navigateToBlogDetails} />;
	routeToComponentMapper[ROUTES.blogDetails] = <BlogDetailsView blogPreview={currentBlogPreview} navigateToMainView={navigateToMainView} />
	routeToComponentMapper[ROUTES.login] = <LoginView />
	routeToComponentMapper[ROUTES.admin] = <AdminView />;

	return routeToComponentMapper[currentRoute]
}
