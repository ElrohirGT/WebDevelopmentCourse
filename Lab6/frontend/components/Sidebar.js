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
 * @param {Blog} blog
 */
const BlogNavButton = ({ blog, blogSetter }) => (
  <div
    style={{
      backgroundColor: "#414141",
      color: "#fff",
      padding: "1rem",
    }}
    onClick={() => blogSetter(blog)}
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

const Sidebar = ({ setDisplayBlog }) => {
  const [blogs, setBlogs] = React.useState([]);
  React.useEffect(async () => {
    const response = await fetchBlogs();
    if (response !== undefined) {
      setBlogs(response);
    }
  }, []);

  return (
    <div
      style={{
        overflow: "scroll",
      }}
    >
      {blogs.map((b) => {
        return (
          <BlogNavButton key={b.blog_id} blogSetter={setDisplayBlog} blog={b} />
        );
      })}
    </div>
  );
};
