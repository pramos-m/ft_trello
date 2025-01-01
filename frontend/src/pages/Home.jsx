import Logout from "../components/Logout.jsx";

function	Home() {
	let	boards = []

	for (let i = 0; i < 10; i++)
		boards.push({
			title: "Mallorca",
			color: "#FF00FF",
			cards: 30,
			lists: 6,
			favorite: i % 3,
			recent: i % 2
		});

	return (
		<div className="w-screen h-screen flex justify-center items-around">
			<div className=" w-[86.8%] h-[8.78%] flex flex-row justify-between items-start mt-4">
				<Logout/>
				<img src="/logo.svg" className="w-[5.188rem] h-[4.875rem]"/>
			</div>
		</div>
	);
}

//<RowSlider title="Favorite" boards={boards}/>
//<RowSlider title="Recent" boards={boards}/>
//<ColumnSlider title="All" boards={boards}/>
export default Home;
