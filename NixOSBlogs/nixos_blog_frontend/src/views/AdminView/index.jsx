import BlogList from "src/components/BlogList";
import "./AdminView.css";
import { Suspense } from "react";

/**
	* @typedef {Object} AdminViewProps
	* @property {string} loginToken
	* @property {import("src/utils/promiseWrapper").SuspenseResource<import("src/dataAccess").BlogPreview[]>} blogsPreviewsResource
	*/

/**
	* @param {AdminViewProps} props
	*/
export default function AdminView({ loginToken, blogsPreviewsResource }) {
	if (!loginToken) {
		const url = window.location.href
		const idx = url.indexOf("/", 9)
		window.location.assign(url.substring(0, idx))
	}

	return <div className="adminViewContainer">
		<h1>Admin Panel</h1>
		<div className="adminViewHeader">
			<input placeholder="Search by title:" />
			<div className="adminViewControls">
				<button className="PrimaryButton" type="button">Search</button>
				<button className="SecondaryButton" type="button">Create Blog</button>
			</div>
		</div>
		<Suspense fallback={<p>Loading...</p>}>
			<AdminBlogList blogResource={blogsPreviewsResource} />
		</Suspense>
	</div>;
}

/**
	* @param {Object} props
	* @param {import("src/utils/promiseWrapper").SuspenseResource<import("src/dataAccess").BlogPreview[]>} props.blogResource
	*/
function AdminBlogList({ blogResource }) {
	const blogs = blogResource.read()

	return <div className="adminBlogsPreview">
		{
			blogs.map(b => {
				return <div className="adminBlogListItem" key={b.id}>
					<h3>{b.title}</h3>
					<div className="adminBlogListItemControls">
						<button className="PrimaryButton InfoButton">Update</button>
						<button className="PrimaryButton NegativeButton">Delete</button>
					</div>
				</div>
			})
		}
	</div>
}
