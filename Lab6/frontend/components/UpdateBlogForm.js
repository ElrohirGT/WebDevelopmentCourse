const UpdateBlogForm = ({ blog }) => {
  const onFormSubmit = (formData) => {};

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
