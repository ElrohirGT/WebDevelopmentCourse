const Card = () => {
  return (
    <div
      style={{
        backgroundColor: "pink",
        padding: "3rem",
        display: "flex",
        flexDirection: "column",
        borderRadius: "10%",
      }}
    >
      <img
        style={{
          width: "80%",
          alignSelf: "center",
          borderRadius: "50%",
        }}
        src="./static/card_image.png"
      />
      <p>Nombre: </p>
      <p>Descripcion: </p>
    </div>
  );
};
