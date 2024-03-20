const MainComponent = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        display: "grid",
        gridTemplateColumns: "10% 90%",
        gridTemplateRows: "10% 90%",
        gridTemplateAreas: `
				"sidebar header"
				"sidebar content"
				`,
      }}
    >
      <Sidebar />
      <Header />
      <Content />
    </div>
  );
};
