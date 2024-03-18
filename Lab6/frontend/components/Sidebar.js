/**
 * Makes a request to delete a blog.
 * @param {number} blogId The ID of the blog to delete
 */
const deleteBlogRequest = async (blogId) => {
  const url = API_BASE_URL + `/posts/${blogId}`;
  const response = await fetch(url, {
    method: "DELETE",
  }).catch(logError("An error ocurred while deleting blog post"));

  return response;
};

/**
 * @param {{blog: Blog, blogSetter: Function, isSelected: boolean}} props
 */
const BlogNavButton = ({ blog, onClick, isSelected }) => (
  <div
    style={{
      backgroundColor: isSelected ? "black" : "#414141",
      color: "#fff",
      padding: "1rem",
      fontWeight: isSelected ? "bold" : "normal",
    }}
    onClick={onClick}
  >
    <span
      style={{
        color: "lightblue",
        fontWeight: "bold",
      }}
    >
      [{new Date(blog.created_at).toLocaleDateString()}]{" "}
    </span>
    <span>{blog.title}</span>
  </div>
);

/**
 * Sidebar component
 * @param {{ currentBlog: Blog }} props Function to set display of blogs
 */
const Sidebar = ({
  blogs,
  currentBlog,
  openBlogDisplay,
  openCreateBlogDisplay,
  openUpdateBlogDisplay,
  deleteBlog,
}) => (
  <div
    style={{
      overflow: "scroll",
      display: "grid",
      gridTemplateRows: "95vh 5vh",
    }}
  >
    <div
      style={{
        overflow: "scroll",
      }}
    >
      {blogs.map((b) => (
        <BlogNavButton
          key={b.blog_id}
          onClick={() => openBlogDisplay(b)}
          blog={b}
          isSelected={currentBlog.blog_id === b.blog_id}
        />
      ))}
    </div>
    <div>
      <button onClick={openCreateBlogDisplay}>Crear</button>
      <button onClick={openUpdateBlogDisplay}>Editar</button>
      <button
        onClick={async () => {
          if (await deleteBlogRequest(currentBlog.blog_id)) {
            deleteBlog();
          }
        }}
      >
        Borrar
      </button>
    </div>
  </div>
);
