import { useState } from "react";

function	BoardAddTask({onCreate}) {
	const	[enable, setEnable] = useState(false);

	const	handleCreateTask = e => {
		e.preventDefault();

		const data = Object.fromEntries(new FormData(e.target));

		onCreate(data);
		console.log(data);
		setEnable(enable => !enable);
		return ;
	}

	return (
		<div className="flex flex-col gap-y-3 rounded-[0.625rem] bg-white shadow-md px-2 py-2.5">
			{
				enable ?
					<form onSubmit={handleCreateTask} className="flex flex-col gap-y-2">
						<label htmlFor="name">
							<input autoFocus className="w-full h-full p-1 bg-btn-grey-selected rounded-[0.313rem] shadow-inner text-sm" id="name" placeholder="Homeworks, ..." name="name"/>
						</label>
						<div className="flex justify-between">
							<button type="submit" className="w-2/5 text-sm rounded bg-neutral-200 p-1">
								Create task
							</button>
							<button type="button" onClick={() => setEnable(enable => !enable)}>
								<img src="/public/icons/close.svg" className="w-3"/>
							</button>
						</div>
					</form>
				:
					<button className="flex gap-x-2" onClick={() => setEnable(enable => !enable)}>
						<img src="/icons/plus.svg" className="w-4"/>
						<h1 className="font-semibold text-sm">Add a task</h1>
					</button>
			}
		</div>
	);
}

export default BoardAddTask;
