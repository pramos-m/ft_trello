import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Board from "./pages/MyBoard.jsx";
import AuthProvider from "./components/providers/AuthProvider.jsx";
import BoardProvider from "./components/providers/MyBoardProvider.jsx";

function	App() {
	return (
		<AuthProvider>
			<Routes>
				<Route path="/" element={
					<ProtectedRoute>
						<Home/>
					</ProtectedRoute>
				} />
				<Route path="/board/:boardId" element={
					<ProtectedRoute>
						<BoardProvider>
							<Board/>
						</BoardProvider>
					</ProtectedRoute>
				} />
				<Route path="/login" element={<Login/>} />
			</Routes>
		</AuthProvider>
	);
}

export default App;
