import BlogForm from 'src/components/BlogForm';
import './CreateBlogView.css';

export default function CreateBlogForm({ onSubmit }) {
	// const onFormSubmit = async (blogData) => {
	// 	setIsLoading(true);
	//
	// 	let insertedBlog = await insertBlogInDB(blogData);
	// 	await delay(2000);
	//
	// 	if (insertedBlog !== undefined) {
	// 		onSubmit(insertedBlog);
	// 	}
	//
	// 	setIsLoading(false);
	// };

	return (
		<div className='CreateBlogViewContainer'>
			<BlogForm onSubmit={onSubmit} />
		</div>
	);
}
