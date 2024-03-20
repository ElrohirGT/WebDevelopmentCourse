const Header = () => {
  return (
    <div
      style={{
        backgroundColor: "green",
        display: "flex",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          flexGrow: 1,
        }}
      >
        Admin
      </h1>
      <button
        style={{
          borderRadius: "50%",
          alignSelf: "center",
          padding: "1rem",
        }}
      >
        {"->"}
      </button>
    </div>
  );
};
