import { useState, useRef, useMemo } from "react";

export function	Carousel({twClassName, cards, CardComponent, direction})
{
	const	flows = {
		'x': {
			clientAxis: "clientX",
			scrollDirection: "scrollLeft",
		},
		'y': {
			clientAxis: "clientY",
			scrollDirection: "scrollTop",
		},
	};

	const carouselRef = useRef(null);
	const [dragStart, setDragStart] = useState(null);
	const [isDragging, setIsDragging] = useState(false);
	const	flow = useMemo(() => flows[direction], [direction]);

	const	styles = {
		cursor: isDragging ? "grabbing" : "grab",
		userSelect: "none",
		scrollBehavior: "auto", // Cambiado a 'auto' para deshabilitar el desplazamiento suave
		scrollSnapType: "none", // Asegurándonos de que no haya encaje
	};

	//const	getClientX = e => e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
	//const	getScrollLeft = () => carouselRef.current.scrollLeft;
	//const	deltaX = (e, x) => x - getClientX(e);
	//const	setScrollLeft = (left, delta) => carouselRef.current.scrollLeft = left + delta;

	//const	getClientY = e => e.type === "touchstart" ? e.touches[0].clientY : e.clientY;
	//const	getScrollTop = () => carouselRef.current.scrollTop;

  const handleDragStart = (e) => {
    if (!carouselRef.current) return;

		let		dragInfo = {};

    const clientAxisPosition = e.type === "touchstart" ? e.touches[0][flow.clientAxis] : e[flow.clientAxis];

		dragInfo[flow.clientAxis] = clientAxisPosition;
		dragInfo[flow.scrollDirection] = carouselRef.current[flow.scrollDirection];

    setIsDragging(true); // Inicia el arrastre
    setDragStart(dragInfo); // Almacena la posición inicial del arrastre
  };

  const handleDragMove = (e) => {
    if (!isDragging || !dragStart || !carouselRef.current) return;
    //e.preventDefault();

    const clientAxisPosition = e.type === "touchmove" ? e.touches[0][flow.clientAxis] : e[flow.clientAxis];
    const delta = dragStart[flow.clientAxis] - clientAxisPosition; // Calcula el movimiento del arrastre

    carouselRef.current.scrollLeft = dragStart[flow.scrollDirection] + delta; // Mueve el carrusel
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDragStart(null);
  };

	const	events = {
		onMouseDown: handleDragStart,
		onMouseMove: handleDragMove,
		onMouseUp: handleDragEnd,
		onMouseLeave: handleDragEnd,
		onTouchStart: handleDragStart,
		onTouchMove: handleDragMove,
		onTouchEnd: handleDragEnd,
	}

	return (
		<div
			ref={carouselRef}
			className={twClassName}
			style={styles}
			{...events}
		>
			{cards.map((board, i) => (
				<CardComponent key={board.id} {...board}/>
			))}
		</div>
  );
}
