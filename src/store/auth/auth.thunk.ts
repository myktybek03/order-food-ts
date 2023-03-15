import { createAsyncThunk } from '@reduxjs/toolkit'
import { STORAGE_KEYS } from '../../common/constants'

export const signOut = createAsyncThunk('auth/signOut', async () => {
    return localStorage.removeItem(STORAGE_KEYS.AUTH)
})
