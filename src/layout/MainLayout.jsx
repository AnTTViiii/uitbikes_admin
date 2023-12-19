import React from 'react'
import "./main-layout.css"
import SideBar from '../components/sidebar/SideBar'
import TopNav from '../components/topnav/TopNav'
import { Outlet } from 'react-router-dom'
const MainLayout = () => {
  return (
    <div className='main-layout'>
      <SideBar />
      <div className='main'>
        <div className='main__content'>
          <TopNav />
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default MainLayout
