import { Meal } from '../common/types'
import { mainApi } from './instances'

type AllMealsResponse = {
    data: Meal[]
}

const getAllMeals = () => {
    return mainApi.get<AllMealsResponse>('foods')
}

export default { getAllMeals }
