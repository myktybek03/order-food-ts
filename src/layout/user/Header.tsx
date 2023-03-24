import { Button, styled } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signOut } from '../../store/auth/auth.thunk'
import { getBasket } from '../../store/basket/basket.thunk'
import { AppDispatch, RootState } from '../../store/store'
import BusketButton from './basket/BusketButton'

type Props = {
    onShowBasket: () => void
}

const Header = ({ onShowBasket }: Props) => {
    const navigate = useNavigate()
    const isAuthorized = useSelector(
        (state: RootState) => state.auth.isAuthorized
    )

    const items = useSelector((state: RootState) => state.basket.items)
    const [animationClass, setAnimationClass] = useState<string>('')

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(getBasket())
    }, [dispatch])

    const calculateTotalAmount = () => {
        const sum = items.reduce((s, item) => {
            return s + item.amount
        }, 0)
        return sum
    }

    useEffect(() => {
        setAnimationClass('bump')

        const id = setTimeout(() => {
            setAnimationClass('')
        }, 300)

        return () => {
            clearTimeout(id)
        }
    }, [items])

    const signOutHandler = () => {
        dispatch(signOut())
    }

    const signInHandler = () => {
        navigate('/signin')
    }

    const showBasketHandler = () => {
        return onShowBasket()
    }

    const goToOrder = () => {
        return navigate('/my-order')
    }

    return (
        <Container>
            <Logo onClick={() => navigate('/')}>ReactMeals</Logo>
            <BusketButton
                className={animationClass}
                onClick={showBasketHandler}
                count={calculateTotalAmount()}
            />

            <StyledButton onClick={goToOrder} color="error" variant="contained">
                My Orders
            </StyledButton>

            {isAuthorized ? (
                <StyledButton onClick={signOutHandler} variant="contained">
                    Sign Out
                </StyledButton>
            ) : (
                <StyledButton onClick={signInHandler} variant="contained">
                    Sign In
                </StyledButton>
            )}
        </Container>
    )
}

export default Header

const Container = styled('header')(() => ({
    position: 'fixed',
    top: 0,
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    height: '6.3125rem',
    backgroundColor: '#8A2B06',
    alignItems: 'center',
    zIndex: 1,
}))

const Logo = styled('p')(() => ({
    fontWeight: 600,
    fontSize: '2.375rem',
    lineHeight: '3.5625rem',
    color: '#ffffff',
    margin: 0,
}))

const StyledButton = styled(Button)(() => ({
    backgroundColor: '#5A1F08',
    padding: '10px 20px',
    '&:hover': {
        background: '#451907',
    },
}))
