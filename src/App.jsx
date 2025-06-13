import { useState } from 'react'

import './App.css'
import { useRoutes } from 'react-router-dom'
import { routes } from './routes.jsx'
import { Toaster } from 'react-hot-toast'

function App() {
  
  const elements = useRoutes(routes)

  return (
    <>
      {elements}
      <Toaster position='bottom-center'  reverseOrder={false} />
    </>
  )
}

export default App
