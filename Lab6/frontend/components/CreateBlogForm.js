const CreateBlogForm = () => {
  const onFormSubmit = (blogData) => {};

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
