import { Suspense } from "react";
import BlogList from "src/components/BlogList";
import FeaturedBlog from "src/components/FeaturedBlog";
import { getBlogsPreviews } from "src/dataAccess";
// import "./App.css";
import "./MainView.css";
import WrapPromise from "src/utils/promiseWrapper";
import TitleBar from "src/components/TitleBar";

const retrievedBlogs = WrapPromise(getBlogsPreviews());

/**
	* @param {Object} props 
	* @param {()=>void} props.navigateToLogin 
	*/
export default function MainView({ navigateToLogin }) {
	return <div className="MainViewContainer">
		<TitleBar navigateToLogin={navigateToLogin} />
		<Suspense fallback={<LoadingView />}>
			<h2 className="mainTitle">Most Recent</h2>
			<FeaturedBlog blogsResource={retrievedBlogs} />
			<h2 className="mainTitle">Historical</h2>
			<BlogList blogsResource={retrievedBlogs} />
		</Suspense>
	</div>
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
