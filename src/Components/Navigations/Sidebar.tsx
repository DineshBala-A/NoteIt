import React from 'react'
import { NavLink } from 'react-router';
import { useLocation } from 'react-router';
import { useAppSelector, useAppDispatch } from '../../app/hooks'


function getLastPathName() {
  const location = useLocation();
  return location.pathname.split('/').pop() || 'home';
}


function Sidebar() {
  const lastPathName = getLastPathName();
  console.log('sidebar', lastPathName)
  const sidebar_state = useAppSelector(state=>state.sidebar.value);
  const Styles = {
    'sidebarButton' :  "hover:bg-stone-300 hover:shadow-sm dark:hover:bg-zinc-700 active:opacity-[0.5] p-2 rounded-md select-none cursor-pointer",
    'currentSidebarButton' : 'bg-stone-300 shadow-sm dark:bg-zinc-700'
  }
  return (
    <>
      <div
        className={`bg-white inset-shadow-xs ring-1 ring-stone-200 dark:ring-zinc-700 dark:bg-zinc-800 h-[calc(100vh-50px)] overflow-hidden transition-all duration-300 ease-in-out
          ${
            sidebar_state ? 'w-3xs opacity-100 p-5' : 'w-0 opacity-100 p-0'//change this closing width & ml to create mini sidebar 
          } `
        }
      >
        {sidebar_state && 
        <div className="flex flex-col justify-between h-full">
          {/* Top*/}
          <div className="flex flex-col gap-1">
            <NavLink to="/" className={`${Styles.sidebarButton} ${lastPathName == 'home'? Styles.currentSidebarButton :''}`}>Dashboard</NavLink>
            <NavLink to="/users" className={`${Styles.sidebarButton} ${lastPathName == 'users'? Styles.currentSidebarButton :''}`}>Users</NavLink>
            <NavLink to="/note1" className={`${Styles.sidebarButton} ${lastPathName == 'note1'? Styles.currentSidebarButton :''}`}>Note1</NavLink>
          </div>
          {/* Bottom */}
          <div className="flex flex-col gap-2 p-2">
            <NavLink to='/settings' className={`${Styles.sidebarButton} ${lastPathName == 'settings'? Styles.currentSidebarButton :''}`}>Settings</NavLink>
          </div>
        </div>
        }
      </div>
    </>
  )
}

export default Sidebar