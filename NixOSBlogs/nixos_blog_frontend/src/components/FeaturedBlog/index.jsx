import './FeaturedBlog.css'
/**
	* @typedef {Object} FeaturedBlogProps
	* @property {import('../../utils/promiseWrapper.js').SuspenseResource<import('../../dataAccess.js').BlogPreview>} blogsResource
	*/

/**
	* Displays a featured blog
	* @param {FeaturedBlogProps} props
	*/
export default function FeaturedBlog({ blogsResource }) {
	const blog = (blogsResource.read())[0]

	return <div className='featuredContainer '>
		<img src={blog.banner} />
		<h2>{blog.title}</h2>
	</div>
};
