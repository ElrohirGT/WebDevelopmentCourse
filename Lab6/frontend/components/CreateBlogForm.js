const insertBlogInDB = async (blog) => {
  const response = await fetch(API_BASE_URL + "/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blog),
  }).catch(logError("An error occurred while trying to insert a post"));

  if (response === undefined) {
    return;
  }

  const body = await response
    .json()
    .catch(logError("An error occurred while trying to insert a post"));

  console.log(body);
  return body;
};

const CreateBlogForm = ({ onSubmit, setIsLoading }) => {
  const onFormSubmit = async (blogData) => {
    setIsLoading(true);

    let insertedBlog = await insertBlogInDB(blogData);
    await delay(2000);

    if (insertedBlog !== undefined) {
      onSubmit(insertedBlog);
    }

    setIsLoading(false);
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
