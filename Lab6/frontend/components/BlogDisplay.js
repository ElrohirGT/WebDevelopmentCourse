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
      <img
        style={{
          height: "25vh",
          maxWidth: "100%",
        }}
        src={blog.banner}
      />
      <h1>{blog.title}</h1>
    </div>
    <p>{blog.content}</p>
  </div>
);
