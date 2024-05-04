import BlogList from "src/components/BlogList";
import "./AdminView.css";
import { Suspense, useState } from "react";

/**
	* @typedef {Object} AdminViewProps
	* @property {string} loginToken
	* @property {import("src/utils/promiseWrapper").SuspenseResource<import("src/dataAccess").BlogPreview[]>} blogsPreviewsResource
	* @property {(blogPreview: import("src/dataAccess").BlogPreview)=>void} navigateToBlogDetails
	* @property {()=>void} navigateToCreateBlogForm
	* @property {(blogId: number)=>Promise<void>} deleteBlog
	*/

/**
	* @param {AdminViewProps} props
	*/
export default function AdminView({ loginToken, blogsPreviewsResource, navigateToBlogDetails, navigateToCreateBlogForm, deleteBlog }) {
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
			<AdminBlogList blogResource={blogsPreviewsResource} navigateToBlogDetails={navigateToBlogDetails} deleteBlog={deleteBlog} />
		</Suspense>
	</div>;
}

/**
	* @param {Object} props
	* @param {import("src/utils/promiseWrapper").SuspenseResource<import("src/dataAccess").BlogPreview[]>} props.blogResource
	* @param {(blogPreview: import("src/dataAccess").BlogPreview)=>void} props.navigateToBlogDetails
	* @param {(blogId: number)=>Promise<void>} props.deleteBlog
	*/
function AdminBlogList({ blogResource, navigateToBlogDetails, deleteBlog }) {
	const [blogs, setBlogs] = useState(blogResource.read())

	const onDelete = async (ev, blogId) => {
		ev.stopPropagation()

		try {
			await deleteBlog(blogId)
			setBlogs(blogs.filter(b => b.id !== blogId))
		} catch (error) {
			console.error("CANT DELETE BLOG!", blogId)
		}
	}

	return <div className="adminBlogsPreview">
		{
			blogs.map(b => {
				return <div className="adminBlogListItem" key={b.id} onClick={() => navigateToBlogDetails(b)}>
					<h3>{b.title}</h3>
					<div className="adminBlogListItemControls">
						<button className="PrimaryButton NegativeButton" type="button" onClick={(ev) => onDelete(ev, b.id)}>Delete</button>
					</div>
				</div>
			})
		}
	</div>
}
