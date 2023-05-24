import "../styles/HomeComp.css"
import React from 'react'
import Posts from './Posts'
import Sidebar from './Sidebar'

const HomeComp = () => {
  return (
    <div className="home">
      <Posts/>
      <Sidebar/>
    </div>
  )
}

export default HomeComp