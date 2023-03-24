/* eslint-disable no-underscore-dangle */
import { styled } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useAppDispatch from '../../hooks/useAppDispatch'
import { getOrder } from '../../store/orders/orders.thunk'
import { RootState } from '../../store/store'

const Order = () => {
    const dispatch = useAppDispatch()
    const items = useSelector((state: RootState) => state.order.order)

    useEffect(() => {
        dispatch(getOrder())
    }, [])

    return (
        <Content>
            {items.map((item) =>
                item.items.map((meal) => (
                    <MealContent key={meal._id}>
                        <p>{meal.title}</p>
                        <p>${meal.price}</p>
                        <span>x{meal.amount}</span>
                    </MealContent>
                ))
            )}
        </Content>
    )
}

export default Order

const Content = styled('div')(({ theme }) => ({
    display: 'grid',
    gap: '10px',
    background: theme.palette.primary.dark,
    color: '#fff',
}))

const MealContent = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottom: '1px solid #222',
}))
