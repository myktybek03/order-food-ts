import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError, isAxiosError } from 'axios'
import authService from '../../api/authService'
import { STORAGE_KEYS } from '../../common/constants'

export const signOut = createAsyncThunk('auth/signOut', async () => {
    return localStorage.removeItem(STORAGE_KEYS.AUTH)
})

type SignInPayload = {
    email: string
    password: string
}

export const signIn = createAsyncThunk(
    'auth/signIn',
    async (payload: SignInPayload, { rejectWithValue }) => {
        try {
            const { data } = await authService.signIn(payload)

            localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(data.data))
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

type SignUpPayload = SignInPayload & { name: string }

export const signUp = createAsyncThunk(
    'auth/signUp',
    async (payload: SignUpPayload, { rejectWithValue }) => {
        try {
            const { data } = await authService.signUp(payload)

            localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(data.data))
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
