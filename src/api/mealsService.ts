import { Meal } from '../common/types'
import { axiosInstance } from '../config/axiosInstance'
import { mainApi } from './instances'

type AllMealsResponse = {
    data: Meal[]
}

const getAllMeals = () => {
    return mainApi.get<AllMealsResponse>('foods')
}
type MealResponse = {
    data: Meal
}

const getMealById = (id: string) => {
    return mainApi.get<MealResponse>(`foods/${id}`)
}

const removeMeal = (id: string) => {
    return axiosInstance.delete(`foods/${id}`)
}

export default { getAllMeals, removeMeal, getMealById }
