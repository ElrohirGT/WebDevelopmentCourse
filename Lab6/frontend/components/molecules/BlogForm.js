/**
 * Sample Blog form component
 * @param {{blog: Blog|null, onSubmit: Function}} props
 **/
const BlogForm = ({ blog, onSubmit }) => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [banner, setBanner] = React.useState("");

  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="Título:"
        defaultValue={blog?.title ? blog.title : ""}
      />
      {blog?.banner ? <img src={blog.banner} /> : null}
      <input type="file" placeholder="Banner:" />
      <textarea
        placeholder="Contenido:"
        defaultValue={blog?.content ? blog.content : ""}
      />
      <button>Subir</button>
    </React.Fragment>
  );
};
