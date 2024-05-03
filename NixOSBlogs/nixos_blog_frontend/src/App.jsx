import { useEffect, useState } from "react";
import "./App.css";
import AdminView from "src/views/AdminView";
import LoginView from "src/views/LoginView";
import MainView from "src/views/MainView";
import BlogDetailsView from "src/views/BlogDetailsView";
import { createBlog, getBlogsPreviews, loginUser } from "src/dataAccess";
import { useLocalStorage } from "src/utils/hooks";
import WrapPromise from "./utils/promiseWrapper";
import CreateBlogForm from "./views/CreateBlogView";

export const ROUTES = {
	home: "HOME",
	login: "LOGIN",
	admin: "ADMIN",
	createBlogForm: "CREATE_BLOG",
	updateBlogForm: "UPDATE_BLOG",
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
	const navigateToCreateBlogForm = () => {
		setCurrentBlog(undefined);
		setCurrentRoute(ROUTES.createBlogForm);
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
	const onCreateBlogFormSubmit = async (data) => {
		console.log("The data to create a blog is: ", data)
		await createBlog(loginToken, data);
	}

	const routeToComponentMapper = {};
	routeToComponentMapper[ROUTES.home] = (
		<MainView navigateToLogin={navigateToLogin} navigateToBlogDetails={navigateToBlogDetails} loginToken={loginToken} blogsPreviewsResource={blogsPreviewsResource} />
	);
	routeToComponentMapper[ROUTES.blogDetails] = (
		<BlogDetailsView blogPreview={currentBlogPreview} navigateToMainView={navigateToMainView} loginToken={loginToken} />
	);
	routeToComponentMapper[ROUTES.login] = <LoginView onLogin={onLogin} />;
	routeToComponentMapper[ROUTES.admin] = <AdminView blogsPreviewsResource={blogsPreviewsResource} loginToken={loginToken} navigateToBlogDetails={navigateToBlogDetails} navigateToCreateBlogForm={navigateToCreateBlogForm} />;
	routeToComponentMapper[ROUTES.createBlogForm] = <CreateBlogForm onSubmit={onCreateBlogFormSubmit} />;

	return routeToComponentMapper[currentRoute];
}
