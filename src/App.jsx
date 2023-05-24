import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'
import UserPosts from './components/UserPosts'

function App() {

  return (
    <div className='App'>
    <Navbar/>
      <Routes>
        <Route element={<Home/>} path='/'/>
        <Route element={<About/>} path='/about'/>
        <Route element={<Contact/>} path='/contact'/>
        <Route element={<UserPosts/>} path='/userposts'/>
      </Routes>
    </div>
  )
}

export default App
