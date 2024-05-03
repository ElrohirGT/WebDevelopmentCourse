import { Suspense } from "react";
import BlogList from "src/components/BlogList";
import FeaturedBlog from "src/components/FeaturedBlog";
import { getBlogsPreviews } from "src/dataAccess";
// import "./App.css";
import "./MainView.css";
import TitleBar from "src/components/TitleBar";
import WrapPromise from "src/utils/promiseWrapper";

const retrievedBlogs = WrapPromise(getBlogsPreviews());

/**
	* @typedef {Object} MainViewProps
	* @property {()=>void} navigateToLogin
	* @property {()=>void} navigateToAdminView
	* @property {string} loginToken
 * @property {(blogId: number)=>void} navigateToBlogDetails
	*/

/**
 * @param {MainViewProps} props
 */
export default function MainView({ navigateToLogin, navigateToAdminView, navigateToBlogDetails, loginToken }) {
	return (
		<div className="MainViewContainer">
			<TitleBar navigateToLogin={navigateToLogin} navigateToAdminView={navigateToAdminView} loginToken={loginToken} />
			<Suspense fallback={<LoadingView />}>
				<h2 className="mainTitle">Most Recent</h2>
				<FeaturedBlog blogsResource={retrievedBlogs} />
				<h2 className="mainTitle">Historical</h2>
				<BlogList blogsResource={retrievedBlogs} navigateToBlogDetails={navigateToBlogDetails} />
			</Suspense>
		</div>
	);
}

function LoadingView() {
	return (
		<>
			<h1 className="mainTitle">Most Recent</h1>
			<img
				style={{
					width: "100%",
					height: "100vh",
				}}
			/>
			<h1 className="mainTitle">Historical</h1>
			<div>
				<p>Loading...</p>
			</div>
		</>
	);
}
