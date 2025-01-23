import { useState, useRef } from "react";

import useClickOutside from "hooks/useClickOutside.js";

function	BoardAddList({onCreate}) {
	const	[enable, setEnable] = useState(false);
	const	toogleEnable = () => setEnable(enable => !enable);
	const	ref = useClickOutside(toogleEnable);
	const	inputRef = useRef();

	const	handleCreateList = e => {
		e.preventDefault();

		const data = Object.fromEntries(new FormData(e.target));

		console.log(data);
		setEnable(enable => !enable);
		onCreate(data);
		return ;
	}

	return (
		<div className="w-[70%] shrink-0 grow-0">
			{
				enable ?
					<form ref={ref} onSubmit={handleCreateList} className="flex flex-col gap-y-2">
						<label htmlFor="name">
							<input onMouseMove={e => e.stopPropagation()} autoFocus className="w-full h-full p-1 bg-btn-grey-selected rounded-[0.313rem] shadow-inner text-sm" ref={inputRef} id="name" placeholder="To Do, ..." name="name"/>
						</label>
						<div className="flex justify-between">
							<button type="submit" className="w-2/5 text-sm rounded bg-neutral-200 p-1">
								Create list
							</button>
							<button type="button" onClick={toogleEnable}>
								<img src="/icons/close.svg" className="w-3"/>
							</button>
						</div>
					</form>
				:
					<button className="flex gap-x-2" onClick={toogleEnable}>
						<img src="/icons/plus.svg" className="w-4"/>
						<h1 className="font-semibold text-xl">Add a list</h1>
					</button>
			}
		</div>
	);
}

export default BoardAddList;
