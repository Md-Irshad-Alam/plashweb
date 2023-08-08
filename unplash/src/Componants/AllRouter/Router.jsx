import React from 'react'
import Home from '../Pages/Home'
import DisplayImg from '../Pages/DisplayImg'
import HeaderSearch from '../Pages/Navbar'
import { Route, Routes } from 'react-router-dom'
function Router() {
  return (
    <div>
        <HeaderSearch/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/display' element={<DisplayImg/>} />
       
        <Route path='*' element={"Error: 400,  No Route found "} />
      </Routes>
    </div>
  )
}

export default Router
