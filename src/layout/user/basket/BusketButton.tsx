import React from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Button, styled } from '@mui/material'

type Props = {
    count: number
    className: string
    onClick: () => void
}

const BusketButton = ({ count, onClick, className }: Props) => {
    return (
        <StyledButton onClick={onClick} className={className}>
            <ShoppingCartIcon />
            <StyledTitle>You Cart</StyledTitle>
            <StyledCounter id="counter">{count}</StyledCounter>
        </StyledButton>
    )
}

export default BusketButton

const StyledTitle = styled('span')(() => ({
    margin: '0 1.5rem 0 0.75rem',
}))

const StyledCounter = styled('span')(() => ({
    background: '#8A2B06',
    borderRadius: '1.875rem',
    color: '#fff',
    fontWeight: 700,
    fontSize: '1.25rem',
    lineHeight: '1.6875rem',
    padding: '0.25rem 1.25rem',
}))

const StyledButton = styled(Button)(() => ({
    backgroundColor: '#5A1F08',
    color: '#fff',
    borderRadius: '30px',
    padding: '10px 25px',
    '&:hover': {
        background: '#451907',
    },
}))
