import { Grid, styled } from '@mui/material'
import { useCallback, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Basket from './basket/Basket'

const UserLayout = () => {
    const [isBasketVisible, setBasketVisible] = useState(false)

    const showBasketHandler = useCallback(() => {
        setBasketVisible((prevState) => !prevState)
    }, [])

    return (
        <>
            <Header onShowBasket={showBasketHandler} />
            <Basket open={isBasketVisible} onClose={showBasketHandler} />
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
