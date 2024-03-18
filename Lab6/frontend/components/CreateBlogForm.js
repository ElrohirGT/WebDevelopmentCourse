const insertBlogInDB = async (blog) => {
  const response = await fetch(API_BASE_URL + "/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: blog,
  }).catch(logError("An error occurred while trying to insert a post"));

  if (response === undefined) {
    return;
  }

  const body = response
    .json()
    .catch(logError("An error occurred while trying to insert a post"));

  console.log(body);
  return body;
};

const CreateBlogForm = ({ onSubmit }) => {
  const onFormSubmit = async (blogData) => {
    let insertedBlog = await insertBlogInDB(blogData);
    if (insertedBlog !== undefined) {
      onSubmit(insertedBlog);
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
      <BlogForm onSubmit={onFormSubmit} />
    </div>
  );
};
