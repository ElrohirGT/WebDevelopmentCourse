import { Suspense } from "react";
import BlogList from "./components/BlogList";
import FeaturedBlog from "./components/FeaturedBlog";
import { getBlogsPreviews } from "./dataAccess";
import "./App.css";
import WrapPromise from "./utils/promiseWrapper";
import TitleBar from "./components/TitleBar";
import MainView from "./views/MainView";

const retrievedBlogs = WrapPromise(getBlogsPreviews());

export default function MainView() {
	return <div>
		<TitleBar />
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
