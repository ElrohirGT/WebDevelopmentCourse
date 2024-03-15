const APP_ROUTE_CREATE_FORM = "CREATE_FORM";
const APP_ROUTE_UPDATE_FORM = "UPDATE_FORM";
const APP_ROUTE_DISPLAY_FORM = "DISPLAY_FORM";

const ROUTER = {};
const WELCOME_BLOG = {
  title: "Welcome to NixOS Blogs!",
  content: `
		This page presents a lot of blogs for you to read and learn about the beautiful world of Nix! Search or select one of the blogs in the sidebar and get going!
		`,
  banner:
    "data:image/png;base64,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",
};

const MainComponent = () => {
  const [blog, setBlog] = React.useState(WELCOME_BLOG);
  const [route, setRoute] = React.useState(APP_ROUTE_DISPLAY_FORM);
  ROUTER[APP_ROUTE_DISPLAY_FORM] = <BlogDisplay blog={blog}></BlogDisplay>;

  return (
    <div
      style={{
        height: "100%",
        display: "grid",
        gridTemplateColumns: "20% 80%",
      }}
    >
      <Sidebar setDisplayBlog={setBlog}></Sidebar>
      {ROUTER[route]}
    </div>
  );
};
