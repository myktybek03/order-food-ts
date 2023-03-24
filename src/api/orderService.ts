import { MealType } from '../common/types'
import { mainApi } from './instances'

type AllOrdersResponse = {
    data: MealType[]
}

const getAllOrder = () => {
    return mainApi.get<AllOrdersResponse>('orders/all')
}

const getOrder = () => {
    return mainApi.get<AllOrdersResponse>('orders')
}
const postOrder = (totalPrice: { totalPrice: number }) => {
    return mainApi.post('orders', totalPrice)
}

export default { getAllOrder, getOrder, postOrder }
