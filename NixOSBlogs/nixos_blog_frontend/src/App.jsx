import { useEffect, useState } from "react";
import "./App.css";
import AdminView from "src/views/AdminView";
import LoginView from "src/views/LoginView";
import MainView from "src/views/MainView";
import BlogDetailsView from "src/views/BlogDetailsView";
import { getBlogsPreviews, loginUser } from "src/dataAccess";
import { useLocalStorage } from "src/utils/hooks";
import WrapPromise from "./utils/promiseWrapper";

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
	const [loginToken, setLoginToken] = useLocalStorage("NixOSBlogs_LoginToken")
	const blogsPreviewsResource = WrapPromise(getBlogsPreviews());

	const navigateToAdminView = () => {
		setCurrentRoute(ROUTES.admin);
	};
	const navigateToLogin = () => {
		setCurrentRoute(ROUTES.login);
	};
	const navigateToBlogDetails = (blogPreview) => {
		setCurrentBlog(blogPreview);
		setCurrentRoute(ROUTES.blogDetails);
	};
	const navigateToMainView = () => {
		setCurrentBlog(undefined);
		setCurrentRoute(ROUTES.home);
	};

	useEffect(() => {
		const currentUrlRoute = window.location.pathname;
		if (currentUrlRoute === "/admin") {
			navigateToAdminView();
		}
	}, []);

	const onLogin = async (user) => {
		// console.log(user)
		const token = await loginUser(user);
		setLoginToken(token)
		navigateToAdminView()
	}

	const routeToComponentMapper = {};
	routeToComponentMapper[ROUTES.home] = (
		<MainView navigateToLogin={navigateToLogin} navigateToBlogDetails={navigateToBlogDetails} loginToken={loginToken} blogsPreviewsResource={blogsPreviewsResource} />
	);
	routeToComponentMapper[ROUTES.blogDetails] = (
		<BlogDetailsView blogPreview={currentBlogPreview} navigateToMainView={navigateToMainView} loginToken={loginToken} />
	);
	routeToComponentMapper[ROUTES.login] = <LoginView onLogin={onLogin} />;
	routeToComponentMapper[ROUTES.admin] = <AdminView blogsPreviewsResource={blogsPreviewsResource} loginToken={loginToken} />;

	return routeToComponentMapper[currentRoute];
}
