import React from 'react'
 import { Outlet } from 'react-router-dom'
import AdminSidebar from '../Components/Sidebar/AdminSidebar'

const AdminLayout = () => {
  return (
    <div className="overflow-hidden">
    <div className="row">
      <div className="col-2">
        <div className="position-fixed col-lg-2">
          <AdminSidebar />
        </div>
      </div>

       <Outlet/>
    </div>
  </div>
  )
}

export default AdminLayout