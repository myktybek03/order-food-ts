import { Meal } from '../common/types'
import { FormSchema } from '../components/admin/pages/meals/MealModal'
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
    return mainApi.delete<AllMealsResponse>(`foods/${id}`)
}
const addMeal = (data: FormSchema) => {
    return mainApi.post('/foods', data)
}

const editMeal = (id: string, values: FormSchema) => {
    return mainApi.put(`foods/${id}`, values)
}

export default { getAllMeals, getMealById, removeMeal, addMeal, editMeal }
