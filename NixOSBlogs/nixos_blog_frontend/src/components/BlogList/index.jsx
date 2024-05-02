import './blogList.css';
/**
	* @typedef {Object} BlogListProps
	* @property {import('../../utils/promiseWrapper.js').SuspenseResource<import('../../dataAccess.js').BlogPreview>} blogs
	*/

/**
	* List of blogs the user will see when entering the application
	* @param {BlogListProps} props
	*/
export default ({ blogsResource }) => {
	const blogs = blogsResource.read();

	return <div className='blogList'>
		{
			blogs.map(b => {
				return <div key={b.id} className='blogItem'>
					<img src={b.banner} />
					<div className='blogItemInfo'>
						<p>{b.title}</p>
						<p>{new Date(b.published).toLocaleString()}</p>
					</div>
				</div>
			})
		}
	</div>
}
