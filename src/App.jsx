import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import QuizCard from './components/QuizCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar />
      <QuizCard />
    </div>
  )
}

export default App
