/**
 * @param {Blog} blog
 */
const updateBlogInDB = async (blog) => {
  const response = await fetch(API_BASE_URL + `/posts/${blog.blog_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blog),
  }).catch(logError("An error occurred while trying to update a post"));

  if (response === undefined) {
    return;
  }

  const body = await response
    .json()
    .catch(logError("An error occurred while trying to update a post"));
  console.log(body);
  return body;
};

const UpdateBlogForm = ({ blog, onSubmit }) => {
  const onFormSubmit = async (formData) => {
    const updatedBlog = await updateBlogInDB(formData);

    if (updatedBlog !== undefined) {
      onSubmit(updatedBlog);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "4rem",
      }}
    >
      <BlogForm blog={blog} onSubmit={onFormSubmit} />
    </div>
  );
};
