/**
 * Fetches all the blogs from the API.
 * @returns {Promise<Blog[]|null>} A list of blogs or null if an error ocurred.
 */
const fetchBlogs = async () => {
  const url = API_BASE_URL + "/posts";
  const response = await fetch(url, {
    method: "GET",
  }).catch(logError("An error ocurred while retrieving posts from API"));

  console.log(response);

  if (response === undefined) {
    return;
  }

  return response
    .json()
    .catch(
      logError("An error ocurred while retrieving the body of the response!"),
    );
};

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
 * @param {{ setDisplayBlog: Function, currentBlog: Blog }} props Function to set display of blogs
 */
const Sidebar = ({
  setDisplayBlog,
  currentBlog,
  openBlogDisplay,
  openCreateBlogDisplay,
  openUpdateBlogDisplay,
  deleteBlog,
}) => {
  const [blogs, setBlogs] = React.useState([]);
  const [updateBlogsFlag, updateBlogs] = React.useState(false);
  React.useEffect(async () => {
    const response = await fetchBlogs();
    if (response !== undefined) {
      setBlogs(response);
    }
  }, [updateBlogsFlag]);

  return (
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
            onClick={() => {
              setDisplayBlog(b);
              openBlogDisplay();
            }}
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
              updateBlogs(!updateBlogsFlag);
              deleteBlog();
            }
          }}
        >
          Borrar
        </button>
      </div>
    </div>
  );
};
