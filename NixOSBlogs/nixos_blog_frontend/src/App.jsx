import { Suspense } from "react";
import { getBlogsPreviews } from "./dataAccess";
import BlogList from "./components/BlogList";
import FeaturedBlog from "./components/FeaturedBlog";
import './App.css';
import WrapPromise from "./utils/promiseWrapper";

const retrievedBlogs = WrapPromise(getBlogsPreviews())

function App() {
	return (
		<Suspense fallback={<LoadingApp />}>
			<h1 className="mainTitle">Most Recent</h1>
			<FeaturedBlog blogsResource={retrievedBlogs} />
			<h1 className="mainTitle">Historical</h1>
			<BlogList blogsResource={retrievedBlogs} />
		</Suspense >
	);
}

function LoadingApp() {
	return <>
		<h1 className="mainTitle">Most Recent</h1>
		<img style={{
			width: "100vw",
			height: "100vh",
		}} />
		<h1 className="mainTitle">Historical</h1>
		<div>
			<p>Loading...</p>
		</div>
	</>
}

export default App;
