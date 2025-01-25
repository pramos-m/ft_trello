import { useState } from "react";

import { createBoard } from "../services/boards.js";

export function	NewBoard({refresh}) {
	const	[isPopup, setIsPopup] = useState(false);

	const	handleSubmit = (e) => {
		e.preventDefault();

		const data = Object.fromEntries(new FormData(e.target));

		console.log(data);
		createBoard({data})
			.catch(err => {
				console.log(err)
			})
			.finally(() => {
				setIsPopup(false);
				refresh();
			});
		return ;
	}

	return (
		<>
			<button className="bg-transparent" onClick={() => setIsPopup(true)}>
				<h3 className="font-bold text-btn-blue text-[0.625rem]">New</h3>
			</button>
			{
				isPopup && 
					<div className="absolute top-0 left-0 w-screen h-screen bg-blurBackground-dark/75 flex justify-center items-center">
						<div className="w-[19.75rem] h-[9.688rem] bg-white rounded-[0.625rem] p-4 drop-shadow flex flex-col justify-around">
							<div className="flex justify-between">
							<h2 className="flex-1 text-sm text-center font-bold">Create Board</h2>
							<button onClick={() => setIsPopup(false)}>
									<img src="/icons/close.svg"/>
								</button>
							</div>
							<form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-y-2">
								<label htmlFor="name" className="w-full text-[0.625rem]">Title of the board * <br/><br/>
									<input type="text" id="name" name="name" placeholder="Homework, etc" className="w-full py-2 px-2 bg-btn-grey-selected rounded-[0.313rem] shadow-inner text-sm"/><br/>
								</label>
								<input type="submit" value="Create" className="bg-btn-grey-optionSelected rounded-[0.625rem] text-sm py-1 px-4 drop-shadow-md"/>
							</form>
						</div>
					</div>
			}
		</>
	);
}
