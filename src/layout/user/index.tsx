import { Grid, styled } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const UserLayout = () => {
    const [isBasketVisible, setBasketVisible] = useState(false)

    const showBasketHandler = useCallback(() => {
        setBasketVisible((prevState) => !prevState)
    }, [])

    return (
        <>
            <Header onShowBasket={showBasketHandler} />
            <GridStyle>
                <Outlet />
            </GridStyle>
        </>
    )
}

export default UserLayout

const GridStyle = styled(Grid)(() => ({
    marginTop: ' 101px',
}))
