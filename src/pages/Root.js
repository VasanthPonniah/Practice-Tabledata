import React from 'react'
import RootNavigation from '../components/RootNavigation'
import { Outlet } from 'react-router-dom'

const Root = () => {
    return (
        <>
            <RootNavigation />
            <Outlet />
        </>
    )
}

export default Root;