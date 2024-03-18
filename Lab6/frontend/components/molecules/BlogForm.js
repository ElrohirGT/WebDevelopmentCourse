/**
 * Sample Blog form component
 * @param {{blog: Blog|null, onSubmit: function(Blog):void}} props
 **/
const BlogForm = ({ blog, onSubmit }) => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [banner, setBanner] = React.useState("");
  const [canSubmit, setCanSubmit] = React.useState(true);

  const onSubmitForm = () => {
    if (!canSubmit) {
      return;
    }
    const blog = Blog(title, banner, content);
    onSubmit(blog);
  };

  const contentPlaceholder = `
		Contenido:
		# Título del blog
		Blog de ejemplo con un [link](www.google.com)
	`;

  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="Título:"
        defaultValue={blog?.title ? blog.title : ""}
        onChange={(e) => setTitle(e.target.value)}
      />
      {blog?.banner || banner ? <img src={blog?.banner || banner} /> : null}
      <input
        type="file"
        placeholder="Banner:"
        onChange={async (e) => {
          setCanSubmit(false);
          const file = e.target.files[0];
          const dataURL = await new Promise((res, rej) => {
            const reader = new FileReader();
            reader.onloadend = (_) => res(reader.result);
            reader.onerror = (e) => rej(e);
            reader.readAsDataURL(file);
          }).catch(
            logError("An error ocurred while retrieving banner binary data!"),
          );

          if (dataURL === undefined) {
            return;
          }

          setBanner(dataURL);
          setCanSubmit(true);
        }}
      />
      <textarea
        style={{
          height: "10rem",
        }}
        placeholder={contentPlaceholder}
        defaultValue={blog?.content ? blog.content : ""}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={onSubmitForm} disabled={!canSubmit}>
        Subir
      </button>
    </React.Fragment>
  );
};
