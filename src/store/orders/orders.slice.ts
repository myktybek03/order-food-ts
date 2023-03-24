import { createSlice } from '@reduxjs/toolkit'
import { MealType } from '../../common/types'
import { getAllOrder, getOrder } from './orders.thunk'

type OrderState = {
    allOrder: MealType[]
    order: MealType[]
}

const initialState: OrderState = {
    allOrder: [],
    order: [],
}

export const OrdersSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllOrder.fulfilled, (state, { payload }) => {
            state.allOrder = payload
        })
        builder.addCase(getOrder.fulfilled, (state, { payload }) => {
            state.order = payload
        })
    },
})
