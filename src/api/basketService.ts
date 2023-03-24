import { BasketData } from '../common/types'

import { mainApi } from './instances'

const getBasket = () => {
    return mainApi.get('basket')
}

const addToBasket = (newItem: BasketData) => {
    return mainApi.post(`foods/${newItem.id}/addToBasket`, {
        amount: newItem.amount,
    })
}

const updateBasketItem = (id: string, basketAmount: number) => {
    return mainApi.put(`basketItem/${id}/update`, {
        amount: basketAmount,
    })
}

const deleteBasketItem = (id: string) => {
    return mainApi.delete(`basketItem/${id}/delete`)
}

export default { getBasket, addToBasket, updateBasketItem, deleteBasketItem }
