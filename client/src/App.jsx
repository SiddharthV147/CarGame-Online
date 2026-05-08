import { useState } from 'react'
import Game from './pages/Game'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='h-screen w-screen flex justify-center items-center'>
        <Game />
      </div>
    </>
  )
}

export default App
