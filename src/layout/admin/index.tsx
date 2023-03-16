import React from 'react'
import { Grid, styled } from '@mui/material'
import { Outlet } from 'react-router-dom'
import AdminHeader from './Header'

const AdminLayout = () => {
    return (
        <>
            <AdminHeader />
            <GridStyle>
                <Outlet />
            </GridStyle>
        </>
    )
}

export default AdminLayout

const GridStyle = styled(Grid)(() => ({
    marginTop: ' 101px',
}))
