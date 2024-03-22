import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Header from './header'
import MainContent from './MainContent'
import Footer from './Footer'
function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <Header  />
      <MainContent />
      <Footer />
    </>
  )
}

export default App
