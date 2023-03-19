import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError, isAxiosError } from 'axios'
import mealsService from '../../api/mealsService'

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
