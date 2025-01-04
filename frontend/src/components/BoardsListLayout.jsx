import { NewBoard } from "./NewBoard.jsx";
import { BoardPreview } from "./BoardPreview.jsx";

export function	BoardsListLayout({title, boards, create, direction}) {
	return (
		<div className="flex flex-col flex-nowrap w-[95%] overflow-hidden gap-y-4">
			<div className="flex justify-between">
				<h1 className="font-semibold text-xl">{title}</h1>
				{ create && <NewBoard/> }
			</div>
			<div className="w-full h-full flex flex-nowrap flex-row gap-x-4">
				{
					boards && boards.map(board => 
						<BoardPreview key={board.id} name={board.name} list_count={board.lists} tasks_count={board.cards} />
					)
				}
			</div>
		</div>
	);
}
