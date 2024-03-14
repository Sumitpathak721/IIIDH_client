import React from 'react'
import { Outlet } from 'react-router-dom'

function Layout({children}) {
  return (
    <>
    <div>Header</div>
    <Outlet/>
    <div>Footer</div>
    </>
  )
}

export default Layout