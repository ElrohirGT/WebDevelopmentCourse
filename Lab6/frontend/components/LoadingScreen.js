export function LoadingView({ isLoading }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,

        width: "100vw",
        height: "100vh",
        backgroundColor: "#2a2826",
        display: "grid",
        placeItems: "center",
        opacity: isLoading ? 1 : 0,
        zIndex: isLoading ? 100 : -1,

        transition: "opacity 1s ease-out",
      }}
    >
      <img src="imgs/loading.gif" />
    </div>
  );
}
