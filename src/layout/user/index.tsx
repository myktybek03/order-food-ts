import { styled } from '@mui/material'
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

            <Content>
                <Outlet />
            </Content>
        </>
    )
}

export default UserLayout

const Content = styled('div')(() => ({
    marginTop: ' 101px',
}))
