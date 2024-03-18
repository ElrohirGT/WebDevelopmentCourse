/**
 * Sample Blog form component
 * @param {{blog: Blog|null, onSubmit: function(Blog):void}} props
 **/
const BlogForm = ({ blog, onSubmit }) => {
  const [title, setTitle] = React.useState(blog?.title ?? "");
  const [content, setContent] = React.useState(blog?.content ?? "");
  const [banner, setBanner] = React.useState(blog?.banner ?? "");
  const [canSubmit, setCanSubmit] = React.useState(true);

  const onSubmitForm = () => {
    if (!canSubmit) {
      return;
    }
    const formBlog = Blog(title, banner, content, []);
    onSubmit({ ...blog, ...formBlog });
  };

  const contentPlaceholder = `
		Contenido:
		# Título del blog
		Blog de ejemplo con un [link](www.google.com)
	`;

  const imageSource = banner || blog?.banner;

  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="Título:"
        defaultValue={blog?.title ? blog.title : ""}
        onChange={(e) => setTitle(e.target.value)}
      />
      <img
        src={imageSource}
        style={{
          height: imageSource ? "30vh" : "0px",
          alignSelf: "center",
          width: "auto",
          maxWidth: "100%",
        }}
      />
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
      <button
        onClick={onSubmitForm}
        disabled={!canSubmit}
        style={{
          color: "white",
          fontWeight: "bold",
          backgroundColor: "#414141",
          padding: "1rem 2rem",
          border: "0px",
        }}
      >
        Subir
      </button>
    </React.Fragment>
  );
};
