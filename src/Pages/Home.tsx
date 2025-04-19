import React from 'react'
import Sidebar from '../Components/Navigations/Sidebar'
import { Outlet } from 'react-router'

function Home() {
  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        <div>
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="flex-1 h-[calc(100vh-50px)] p-4">
          <Outlet/>
        </div>
      </div>
    </>
  )
}

export default Home