import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Dashboard from './components/Dashboard'

const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<Home />} />
    </Routes>
  )
}

export default App
