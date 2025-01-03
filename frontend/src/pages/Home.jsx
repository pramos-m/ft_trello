import { useState } from "react";
import Logout from "../components/Logout.jsx";

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

function	BoardPreview({name, list_count, tasks_count}) {
	return (
		<div>
			{name}
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

function	NewBoard() {
	const	[isPopup, setIsPopup] = useState(false);

	const	popupCreateNewBoard = () => {
		// alert("create new board");
		setIsPopup(true);
	}

	return (
		<>
			<button className="bg-transparent" onClick={popupCreateNewBoard}>
				<h3 className="font-bold text-btn-blue text-[0.625rem]">New</h3>
			</button>
			{
				isPopup && 
					<div className="absolute top-0 left-0 w-screen h-screen bg-blurBackground-dark/75 flex justify-center items-center">
						<div className="w-[19.75rem] h-[9.688rem] bg-white rounded-[0.625rem] p-2 drop-shadow">
							<div className="flex justify-between">
								<h2 className="text-sm">Create Board</h2>
								<button onClick={() => setIsPopup(false)}>
									<img src="/icons/close.svg"/>
								</button>
							</div>
							<form action="/api/boards/new" className="flex flex-col justify-center items-center gap-2">
								<label for="name" className="text-[0.625rem]">Title of the board *</label><br/>
								<input type="text" id="name" name="name" placeholder="Homework, etc" className="w-[90%] py-2 px-2 bg-btn-grey-selected rounded-[0.313rem] shadow-inner"/><br/>
								<input type="submit" value="Create" className="bg-btn-grey-optionSelected rounded-[0.625rem] text-sm py-1 px-4 drop-shadow-md"/>
							</form>
						</div>
					</div>
			}
		</>
	);
}

function	BoardsListLayout({title, boards, create, direction}) {
	return (
		<div className="flex flex-col w-[95%]">
			<div className="flex justify-between">
				<h1 className="font-semibold text-xl">{title}</h1>
				{ create && <NewBoard/> }
			</div>
			<div className="">
				{
					boards && boards.map(board => 
						board.name
					)
				}
			</div>
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
