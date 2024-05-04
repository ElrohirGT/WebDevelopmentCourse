import { useEffect, useState } from "react";
import "./App.css";
import AdminView from "src/views/AdminView";
import LoginView from "src/views/LoginView";
import MainView from "src/views/MainView";
import BlogDetailsView from "src/views/BlogDetailsView";
import { createBlog, deleteBlog, getBlogsPreviews, loginUser, updateBlog } from "src/dataAccess";
import { useLocalStorage } from "src/utils/hooks";
import WrapPromise from "./utils/promiseWrapper";
import CreateBlogForm from "./views/CreateBlogView";
import UpdateBlogForm from "./views/UpdateBlogView";

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
	const [currentBlogPreview, setCurrentBlogPreview] = useState(undefined);
	const [currentBlogData, setCurrentBlogData] = useState(undefined);
	const [loginToken, setLoginToken] = useLocalStorage("NixOSBlogs_LoginToken")
	const blogsPreviewsResource = WrapPromise(getBlogsPreviews());

	const navigateToAdminView = () => {
		setCurrentRoute(ROUTES.admin);
	};
	const navigateToLogin = () => {
		setCurrentRoute(ROUTES.login);
	};
	const navigateToBlogDetails = (blogPreview) => {
		setCurrentBlogPreview(blogPreview);
		setCurrentRoute(ROUTES.blogDetails);
	};
	const navigateToMainView = () => {
		setCurrentBlogPreview(undefined);
		setCurrentRoute(ROUTES.home);
	};
	const navigateToCreateBlogForm = () => {
		setCurrentBlogPreview(undefined);
		setCurrentRoute(ROUTES.createBlogForm);
	};
	const navigateToUpdateBlogForm = (content) => {
		setCurrentBlogData({ ...currentBlogPreview, content })
		setCurrentRoute(ROUTES.updateBlogForm)
	}

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
		await createBlog(loginToken, data);
		navigateToAdminView()
	}
	const onUpdateBlogFormSubmit = async (data) => {
		await updateBlog(loginToken, data);
		navigateToAdminView()
	}

	const routeToComponentMapper = {};
	routeToComponentMapper[ROUTES.home] = (
		<MainView navigateToLogin={navigateToLogin} navigateToBlogDetails={navigateToBlogDetails} loginToken={loginToken} blogsPreviewsResource={blogsPreviewsResource} />
	);
	routeToComponentMapper[ROUTES.blogDetails] = (
		<BlogDetailsView blogPreview={currentBlogPreview} navigateToMainView={navigateToMainView} loginToken={loginToken} navigateToUpdateBlogForm={navigateToUpdateBlogForm} />
	);
	routeToComponentMapper[ROUTES.login] = <LoginView onLogin={onLogin} />;
	routeToComponentMapper[ROUTES.admin] = <AdminView blogsPreviewsResource={blogsPreviewsResource} loginToken={loginToken} navigateToBlogDetails={navigateToBlogDetails} navigateToCreateBlogForm={navigateToCreateBlogForm} deleteBlog={(id) => deleteBlog(loginToken, id)} />;
	routeToComponentMapper[ROUTES.createBlogForm] = <CreateBlogForm onSubmit={onCreateBlogFormSubmit} />;
	routeToComponentMapper[ROUTES.updateBlogForm] = <UpdateBlogForm onSubmit={onUpdateBlogFormSubmit} blog={currentBlogData} />;

	return routeToComponentMapper[currentRoute];
}
