import React, { useEffect } from 'react'
import MainPage from './sections/MainPage'
import { browserSupport } from './utils/browserSupport'

function App() {
  useEffect(() => {
    browserSupport.init()

    return () => {
      browserSupport.destroy()
    }
  }, [])

  return (
    <MainPage/>
  )
}

export default App