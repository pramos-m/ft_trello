import { useState } from "react";
import Logout from "../components/Logout.jsx";
import { BoardsListLayout } from "../components/BoardsListLayout.jsx";

// function	Carousel({cards}) {
// 	const	[dragInfo, setDragInfo] = useState({isPressed: false, left: 0});

// 	const checkBoundary = e => {
//     let outer = e.target.getBoundingClientRect();
//     let inner = e.target.childNodes[1].getBoundingClientRect();

//     if (parseInt(e.target.childNodes[1].style.left) > 0) {
// 			setDragInfo(prev => ({
// 				...prev,
// 				left: 0
// 			}));
// 			return ;
//     }
//     if (inner.right < outer.right) {
// 			setDragInfo(prev => ({
// 				...prev,
// 				left: -(inner.width - outer.width),
// 			}));
//     }

// 		return ;
// 	};

// 	const	carouselDragStart = (e) => {
// 		setDragInfo(prev => ({
// 			...prev,
// 			isPressed: true,
// 			cursorX: e.clientX - e.target.childNodes[1].offsetLeft
// 		}));
// 		// console.log(e);
// 		// console.log("client x: ", e.clientX);
// 		// console.log(e.target.childNodes[1]);
// 		console.log("offsetLeft: ", e.target.childNodes[1].offsetLeft);
//     e.target.style.cursor = "grabbing";
// 		return ;
// 	}

// 	const	carouselDragMove = (e) => {
// 		if (!dragInfo.isPressed)
// 			return ;
// 		e.preventDefault();
// 		// console.log(e);
// 		// e.preventDefault().
//     setDragInfo(prev => ({
// 			...prev,
// 			left: e.clientX - prev.left
// 		}));
// 		checkBoundary(e);
// 		return ;
// 	}

// 	const	carouselDragEnd = (e) => {
// 		setDragInfo(prev => ({
// 			...prev,
// 			isPressed: false,
// 		}));
// 		e.target.style.cursor = "grab";
// 		return ;
// 	}

// 	console.log(dragInfo);
// 	return (
// 		<div className="w-[95%] h-1/5 overflow-hidden absolute top-[15%]"
// 			onMouseDown={carouselDragStart} onMouseMove={carouselDragMove} onMouseUp={carouselDragEnd}>
// 			<h1 className="mb-4 pointer-events-none">Favorite</h1>
// 			<div className={`w-full h-[70%] flex gap-4 pointer-events-none absolute top-[35%]`}
// 				style={{left: `${dragInfo.left}px`}} >
// 				{
// 					[...Array(8).keys()].map(i =>
// 						<div key={`Patata ${i}`} className="flex-none w-[60%] h-full border-2 rounded-xl flex justify-center items-center">
// 							Patata {i}
// 						</div>
// 					)
// 				}
// 			</div>
// 		</div>
// 	);
// }

function	BoardsList() {
	return (
		<div>
		</div>
	);
}

function	Carousel({direction, innerContainer, cards, CardComponent}) {
	return (
		<div>
			{
				cards && cards.map(card => 
					<CardComponent key={card.id} {...card} />
				)
			}
		</div>
	);
}

function	Home() {
	let	boards = []
	let	categories = [
		{name: "Favorite", filter: ({favorite}) => favorite, create: false, direction: "x"},
		{name: "Recent", filter: ({recent}) => recent, create: false, direction: "x"},
		{name: "All", filter: () => true, create: true, direction: "y"},
	]

	for (let i = 0; i < 10; i++)
		boards.push({
			id: i,
			name: `Mallorca${i}`,
			color: "#FF00FF",
			cards: 30,
			lists: 6,
			favorite: i % 3,
			recent: i % 2
		});

	return (
		<div className="w-screen h-screen flex flex-col items-center gap-y-4">
			<div className=" w-[86.8%] h-[8.78%] flex flex-row justify-between items-start mt-4">
				<Logout/>
				<img src="/logo.svg" className="w-[5.188rem] h-[4.875rem]"/>
			</div>
			{
				categories && categories.map(({name, filter, create, direction}) => 
					<BoardsListLayout key={name} title={name} create={create} direction={direction} boards={boards.filter(filter)}/>
				)
			}
		</div>
	);
}
// <BoardsListLayout title=""/>
// <BoardsListLayout title=""/>
// <Carousel direction="x" innerContainer={BoardsListLayout} cards={boards.filter(({favorite}) => favorite)} CardComponent={BoardPreview}/>
// <Carousel direction="x" innerContainer={BoardsListLayout} cards={boards.filter(({recent}) => recent)} CardComponent={BoardPreview}/>
// <Carousel direction="y" innerContainer={BoardsListLayout} cards={boards} CardComponent={BoardPreview}/>

//<RowCarousel title="Favorite" boards={boards}/>
//<RowCarousel title="Recent" boards={boards}/>
//<ColumnCarousel title="All" boards={boards}/>
export default Home;
