import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import SidebarMenu from '../common/SidebarMenu';

function	BoardSidebar({title}) {
	const	[showSidebar, setShowSidebar] = useState(false);

	const	toggleSidebar = () => setShowSidebar(prev => !prev);

	return (
		<div>
			<button
				onClick={toggleSidebar}
				className="flex items-center gap-2 hover:bg-gray-50 rounded px-2 py-1"
			>
				<h1 className="text-xl font-semibold text-neutral-grey-800">{title}</h1>
				<img src="/icons/arrowRight.svg" className={`transition-transform ${showSidebar ? 'rotate-180' : ''}`}/>
			</button>

			{/* Overlay cuando el sidebar está abierto */}
			<AnimatePresence>
				{showSidebar && 
					<>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={toggleSidebar}
							className="fixed inset-0 bg-black/20 backdrop-blur-sm z-100"
						/>
						<motion.div
							initial={{ x: -320 }}
							animate={{ x: 0 }}
							exit={{ x: -320 }}
							transition={{ type: "spring", stiffness: 300, damping: 30 }}
							className="fixed top-0 left-0 w-80 h-full bg-white shadow-xl z-20"
						>
							<SidebarMenu onClose={toggleSidebar} />
						</motion.div>
					</>
				}
			</AnimatePresence>
		</div>
	);
}

export default BoardSidebar;
