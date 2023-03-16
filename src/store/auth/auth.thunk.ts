import { createAsyncThunk } from '@reduxjs/toolkit'
import { signInRequest } from '../../api/authService'
import { STORAGE_KEYS } from '../../common/constants'

export const signOut = createAsyncThunk('auth/signOut', async () => {
    return localStorage.removeItem(STORAGE_KEYS.AUTH)
})

type User = {
    email: string
    password: string
}

export const signIn = createAsyncThunk(
    'auth/signin',
    async (values: User, { rejectWithValue }) => {
        try {
            await signInRequest(values)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
