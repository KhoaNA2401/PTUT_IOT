import React, { useEffect, useState } from 'react';
import './App.css';
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import img from './background.jpg'
function App() {
  const [color, setColor] = useColor("hex", "#121212");
  const [mode, setMode] = useState(4);
  useEffect(() => {
    fetch('https://demolab-9dfb3-default-rtdb.asia-southeast1.firebasedatabase.app/.json', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        { "RGB": { "r": color.rgb.r, "g": color.rgb.g, "b": color.rgb.b }, "mode": mode }
      )
    })
      .then(response => response.json())
  }, [color, mode]);

  useEffect(() => {
    if (mode == 3 || mode == 4) {
      alert('Please click reset button in devices to load the new mode this mode will be load after 10s')
    }
  }, [mode])

  return (
    <div className='bg'>

      <div className='center'>
        <div style={{
          fontSize: '30px',
          color: 'white',
        }}>
          <p >
            Wellcome to the controlled LED mode
          </p>
        </div>
        <div style={{
          justifyContent: 'space-between',
          display: 'flex',
          height: '50px',
          width: '500px',
          marginBottom: '50px'
        }}>
          <button className='rgb-button' onClick={() => setMode(1)}>Visualizer</button>
          <button className='rgb-button' onClick={() => setMode(2)}>VU Meter</button>
          <button className='rgb-button' onClick={() => setMode(3)}>RBG</button>
          <button className='rgb-button' onClick={() => setMode(4)}>Custome Color</button>
        </div>

        {
          mode === 4 ? <ColorPicker width={456} height={228} color={color} onChange={setColor} hideHSV hideHEX
            dark={mode === 4 ? false : true}
          /> : null
        }

      </div>
    </div>
  );
}

export default App;
