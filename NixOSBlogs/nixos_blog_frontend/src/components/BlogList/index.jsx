import "./BlogList.css";
/**
 * @typedef {Object} BlogListProps
 * @property {import('../../utils/promiseWrapper.js').SuspenseResource<import('../../dataAccess.js').BlogPreview>} blogs
 * @property {(blogId: number)=>void} navigateToBlogDetails
 */

/**
 * List of blogs the user will see when entering the application
 * @param {BlogListProps} props
 */
export default function BlogList({ blogsResource, navigateToBlogDetails }) {
  const blogs = blogsResource.read();

  return (
    <div className="blogList">
      {blogs.map(b => {
        return (
          <div key={b.id} className="blogItem" onClick={() => navigateToBlogDetails(b)}>
            <img src={b.banner} />
            <div className="blogItemInfo">
              <p>{b.title}</p>
              <p>{new Date(b.published).toLocaleString()}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
