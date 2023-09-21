import React from 'react'
import ActionNavigation from '../components/ActionNavigation'
import { Outlet } from 'react-router-dom'

const ActionRootLayout = () => {
    return (
        <>
            <ActionNavigation />
            <Outlet />
        </>
    )
}

export default ActionRootLayout