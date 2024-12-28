import { useState, useEffect } from 'react'

function App() {
	const	[message, setMessage] = useState("");

	useEffect(() => {
		fetch("/api/").then(data => data.json()).then(data => setMessage(data["message"]));
	}, []);

  return (
    <>
			<h1>
				{message}
			</h1>
    </>
  )
}

export default App
