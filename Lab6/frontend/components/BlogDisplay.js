/**
 * Blog display component
 * @param {BlogDisplayProps} props The Blog Post to display
 */
const BlogDisplay = ({ blog }) => (
  <div
    style={{
      padding: "2rem",
    }}
  >
    <div>
      {blog.banner ? (
        <img
          style={{
            height: "30vh",
            maxWidth: "100%",
          }}
          src={blog.banner}
        />
      ) : null}
      <h1>{blog.title}</h1>
    </div>
    <window.Markdown>{blog.content}</window.Markdown>
  </div>
);
