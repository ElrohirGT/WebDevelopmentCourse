import BlogForm from 'src/components/BlogForm';
import './UpdateBlogView.css';

/**
	* @typedef {Object} UpdateBlogFormProps
	* @property {(blog: BlogData)=>void} onSubmit
	* @property {import('src/components/BlogForm').BlogData} blog
	*/

/**
	* @param {UpdateBlogFormProps} props 
	*/
export default function UpdateBlogForm({ onSubmit, blog }) {
	return (
		<div className='UpdateBlogViewContainer'>
			<BlogForm onSubmit={onSubmit} blogInfo={blog} />
		</div>
	);
}
