import { useParams } from "react-router-dom";

function Board() {
  const { id } = useParams(); // Captura el ID del board desde la URL.

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Board ID: {id}</h1>
      {/* Puedes agregar más detalles o funcionalidad aquí */}
    </div>
  );
}

export default Board;
