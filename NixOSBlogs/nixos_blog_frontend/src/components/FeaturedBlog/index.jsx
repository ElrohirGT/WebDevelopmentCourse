import "./FeaturedBlog.css";
/**
 * @typedef {Object} FeaturedBlogProps
 * @property {import('../../utils/promiseWrapper.js').SuspenseResource<import('../../dataAccess.js').BlogPreview>} blogsResource
 * @property {()=>void} navigateToBlogDetails
 */

/**
 * Displays a featured blog
 * @param {FeaturedBlogProps} props
 */
export default function FeaturedBlog({ blogsResource, navigateToBlogDetails }) {
	const blog = (blogsResource.read())[0];

	return (
		<div className="featuredContainer" onClick={() => navigateToBlogDetails(blog)}>
			<img src={blog.banner} />
			<h2>{blog.title}</h2>
		</div>
	);
}
