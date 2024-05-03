import BlogList from "src/components/BlogList";
import "./AdminView.css";
import { Suspense } from "react";

/**
	* @typedef {Object} AdminViewProps
	* @property {string} loginToken
	* @property {import("src/utils/promiseWrapper").SuspenseResource<import("src/dataAccess").BlogPreview[]>} blogsPreviewsResource
	* @property {(blogPreview: import("src/dataAccess").BlogPreview)=>void} navigateToBlogDetails
	* @property {()=>void} navigateToCreateBlogForm
	*/

/**
	* @param {AdminViewProps} props
	*/
export default function AdminView({ loginToken, blogsPreviewsResource, navigateToBlogDetails, navigateToCreateBlogForm }) {
	const navigateToHome = () => {
		const url = window.location.href
		const idx = url.indexOf("/", 9)
		window.location.assign(url.slice(0, idx))
	}

	if (!loginToken) {
		navigateToHome()
	}

	return <div className="adminViewContainer">
		<h1>Admin Panel</h1>
		<div className="adminViewHeader">
			<button className="SecondaryButton" type="button" onClick={navigateToHome}>Home</button>
			<button className="PrimaryButton" type="button" onClick={navigateToCreateBlogForm}>Create Blog</button>
		</div>
		<Suspense fallback={<p>Loading...</p>}>
			<AdminBlogList blogResource={blogsPreviewsResource} navigateToBlogDetails={navigateToBlogDetails} />
		</Suspense>
	</div>;
}

/**
	* @param {Object} props
	* @param {import("src/utils/promiseWrapper").SuspenseResource<import("src/dataAccess").BlogPreview[]>} props.blogResource
	* @param {(blogPreview: import("src/dataAccess").BlogPreview)=>void} props.navigateToBlogDetails
	*/
function AdminBlogList({ blogResource, navigateToBlogDetails }) {
	const blogs = blogResource.read()

	return <div className="adminBlogsPreview">
		{
			blogs.map(b => {
				return <div className="adminBlogListItem" key={b.id} onClick={() => navigateToBlogDetails(b)}>
					<h3>{b.title}</h3>
					<div className="adminBlogListItemControls">
						<button className="PrimaryButton InfoButton" type="button">Update</button>
						<button className="PrimaryButton NegativeButton" type="button">Delete</button>
					</div>
				</div>
			})
		}
	</div>
}
