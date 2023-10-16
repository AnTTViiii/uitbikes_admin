import React from 'react'
import './tovnav.css'
import UserInfo from '../user-info/UserInfo'
import { data } from '../../constants'
import { MenuRounded } from '@mui/icons-material'

const TopNav = () => {
  const openSideBar = () => {
    document.body.classList.add('sidebar-open')
  }
  return (
    <div className='topnav'>
      <UserInfo user={data.user} />
      <div className="sidebar-toggle" onClick={openSideBar}>
        <MenuRounded className='icon'/>
      </div>
    </div>
  )
}

export default TopNav
