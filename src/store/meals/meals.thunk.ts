import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError, isAxiosError } from 'axios'
import mealsService from '../../api/mealsService'
import { FormSchema } from '../../components/admin/pages/meals/MealModal'
import { EditMeal } from '../../common/types'

export const getAllMeals = createAsyncThunk(
    'meals/getAll',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await mealsService.getAllMeals()
            return data.data
        } catch (e) {
            if (isAxiosError(e)) {
                const error = e as AxiosError<{
                    status: number
                    message: string
                }>
                return rejectWithValue(error.response?.data.message)
            }
            return rejectWithValue('Some thing went wrong!')
        }
    }
)

export const addMeals = createAsyncThunk(
    'meals/addMeals',
    async (payload: FormSchema, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await mealsService.addMeal(payload)
            dispatch(getAllMeals())
            return data.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const deleteMeal = createAsyncThunk(
    'meal/deleteMeal',
    async (id: string, { dispatch, rejectWithValue }) => {
        try {
            await mealsService.removeMeal(id)
            return dispatch(getAllMeals())
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const editMeal = createAsyncThunk(
    'meal/editMeal',
    async ({ id, values }: EditMeal, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await mealsService.editMeal(id, values)
            dispatch(getAllMeals())
            return data.data
        } catch (e) {
            if (isAxiosError(e)) {
                const error = e as AxiosError<{
                    status: number
                    message: string
                }>
                return rejectWithValue(error.response?.data.message)
            }
            return rejectWithValue('Something went wrong')
        }
    }
)
