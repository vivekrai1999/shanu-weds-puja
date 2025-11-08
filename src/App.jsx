import React from 'react'
import MainPage from './sections/MainPage'
import MainLayout from './layouts/MainLayout'

function App() {
  return (
    <div>
    <MainLayout
      content={<MainPage/>}
    />
    </div>
  )
}

export default App