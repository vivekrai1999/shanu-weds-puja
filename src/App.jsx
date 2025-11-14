import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import MainPage from './sections/MainPage'

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      easing: 'ease-out',
      once: false,
      offset: 120,
    })
  }, [])

  return (
    <MainPage/>
  )
}

export default App