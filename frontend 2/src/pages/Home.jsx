import { useState, useRef } from "react";
import Logout from "../components/Logout.jsx";

function Home() {
  const carouselRef = useRef(null); // Referencia al contenedor del carrusel
  const [dragStart, setDragStart] = useState(null); // Estado para almacenar el inicio del arrastre
  const [isDragging, setIsDragging] = useState(false); // Estado para saber si se está arrastrando
  const [scrollPosition, setScrollPosition] = useState(0); // Estado para almacenar la posición del scroll

  const boardWidth = 300; // Ancho de cada elemento del carrusel
  const gap = 16; // Espacio entre elementos
  const boards = Array.from({ length: 5 }, (_, i) => ({
    title: `Board ${i + 1}`,
    color: "#FF00FF",
    cards: 30,
    lists: 6,
    favorite: i % 3,
    recent: i % 2,
  })); // Datos de ejemplo para los elementos del carrusel

  const handleDragStart = (e) => {
    if (!carouselRef.current) return;

    const clientX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
    setIsDragging(true); // Inicia el arrastre
    setDragStart({
      x: clientX,
      scrollLeft: carouselRef.current.scrollLeft,
    }); // Almacena la posición inicial del arrastre
  };

  const handleDragMove = (e) => {
    if (!isDragging || !dragStart || !carouselRef.current) return;
    e.preventDefault();

    const clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
    const delta = dragStart.x - clientX; // Calcula el movimiento del arrastre

    setScrollPosition(dragStart.scrollLeft + delta); // Actualiza la posición del scroll
    carouselRef.current.scrollLeft = dragStart.scrollLeft + delta; // Mueve el carrusel
  };

  const handleDragEnd = () => {
    setIsDragging(false); // Termina el arrastre
    setDragStart(null); // Resetea el estado del arrastre
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center gap-4">
      <div className="w-[86.8%] h-[8.78%] flex flex-row justify-between items-start mt-4">
        <Logout />
        <img src="/logo.svg" className="w-[5.188rem] h-[4.875rem]" alt="Logo" />
      </div>

      <div className="w-[95%] h-1/5 overflow-hidden">
        <h1 className="mb-4">Favorite</h1>
        <div
          ref={carouselRef}
          className="w-full h-[70%] flex gap-4 overflow-x-auto hide-scrollbar"
          style={{
            cursor: isDragging ? "grabbing" : "grab",
            userSelect: "none",
            scrollBehavior: "auto", // Cambiado a 'auto' para deshabilitar el desplazamiento suave
            scrollSnapType: "none", // Asegurándonos de que no haya encaje
          }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {boards.map((board, i) => (
            <div
              key={i}
              className="flex-none border-2 rounded-xl flex justify-center items-center"
              style={{
                width: `${boardWidth}px`,
                height: "100%",
              }}
            >
              {board.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
