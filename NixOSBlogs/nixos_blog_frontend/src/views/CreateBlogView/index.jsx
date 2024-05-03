import BlogForm from 'src/components/BlogForm';
import './CreateBlogView.css';

export default function CreateBlogForm({ onSubmit }) {
	return (
		<div className='CreateBlogViewContainer'>
			<BlogForm onSubmit={onSubmit} />
		</div>
	);
}
