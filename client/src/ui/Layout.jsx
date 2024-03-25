import React from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="overflow-hidden">
    <div className="row">
      <div className="col-2">
        <div className="position-fixed col-lg-2">
          <Sidebar />
        </div>
      </div>

       <Outlet/>
    </div>
  </div>
  )
}

export default Layout