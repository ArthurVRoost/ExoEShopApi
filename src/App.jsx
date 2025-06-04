import { useState } from 'react'
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Produits from './pages/products/Produits'
import Details from './pages/details/Details'

function App() {
  

  return (
    <>
    <> 
        <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/produits' element={<Produits/>} />
      <Route path="/produit/:id" element={<Details />} />
     </Routes>
    </>
   
    </>
  )
}

export default App
