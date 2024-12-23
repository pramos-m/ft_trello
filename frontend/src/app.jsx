import { useState, useEffect } from 'preact/hooks';
import { Slider } from './slider.jsx'
import { h } from 'preact';

export function App() 
{
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchMessage() {
      const response = await fetch('/api/');
      const data = await response.json();
      setMessage(data.message);
    }
    fetchMessage();
  }, []);

  return (
    <>
	  <Slider>
		<div> children 1 </div>
		<div> children 2 </div>
		<div> children 3 </div>
	  </Slider>
    </>
  );
}
