import { createSlice } from '@reduxjs/toolkit'
import { UserRoles } from '../../common/types'
import { signIn, signOut, signUp } from './auth.thunk'

interface AuthState {
    isAuthorized: boolean
    token: string
    user: {
        role: UserRoles
        email: string
        name: string
    }
}

const getInitialState = () => {
    const jsonData = localStorage.getItem('AUTH')
    if (jsonData) {
        const userData = JSON.parse(jsonData) as Omit<AuthState, 'isAuthorized'>
        return {
            isAuthorized: true,
            token: userData.token,
            user: {
                name: userData.user.name,
                email: userData.user.email,
                role: userData.user.role,
            },
        }
    }
    return {
        isAuthorized: false,
        token: '',
        user: {
            role: UserRoles.GUEST,
            email: '',
            name: '',
        },
    }
}

const initialState: AuthState = getInitialState()

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.isAuthorized = true
            state.token = action.payload.token
            state.user = {
                email: action.payload.user.email,
                role: action.payload.user.role,
                name: action.payload.user.name,
            }
        })
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.isAuthorized = true
            state.token = action.payload.token
            state.user = {
                email: action.payload.user.email,
                role: action.payload.user.role,
                name: action.payload.user.name,
            }
        })

        builder.addCase(signOut.fulfilled, (state) => {
            state.isAuthorized = false
            state.token = ''
            state.user = {
                email: '',
                role: UserRoles.GUEST,
                name: '',
            }
        })
    },
})

export default authSlice
export const authActions = authSlice.actions
