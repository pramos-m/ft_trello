import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import AuthProvider from "./components/AuthProvider.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function	App() {
  return (
		<AuthProvider>
			<Routes>
				<Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
				<Route path="/login" element={<Login/>} />
			</Routes>
		</AuthProvider>
  );
}

export default App;
