import { useState } from 'react'
import CanvasBoard from './components/CanvasBoard'
import { Simulator } from './components/Simulator';

function App() {
  const [start, setStart] = useState(false);
  const Menu = () => {
  return(
    <div>
      <div className='bg-blue-500 text-white py-5 px-9 rounded-4xl hover: cursor-pointer' onClick={() => setStart(true)}>
          Start Game
      </div>
    </div>
    );
  }

  return (
    <>
      <div className='w-screen h-screen flex justify-center items-center'>
        {/* <CanvasBoard /> */}
        {
          !start ? <Menu/> : <Simulator />
        }
      </div>
    </>
  )
}

export default App
