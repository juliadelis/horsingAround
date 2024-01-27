import React from 'react'
import { Routes , Route, BrowserRouter } from 'react-router-dom'
import VerCavalo from '../components/Cavalo'
import Grid from '../components/Grid'
import Home from '../components/Home'
import Layout from '../components/Layout'
import Add from '../pages/Add'
import Update from '../pages/Update'

const Router = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="cavalos" element={<Grid/>} />
          <Route path="adicionar_cavalo" element={<Add />} />
          <Route path="editar_cavalo/:id" element={<Update />} />
          <Route path="cavalos/:id" element={<VerCavalo />} />
        </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default Router

