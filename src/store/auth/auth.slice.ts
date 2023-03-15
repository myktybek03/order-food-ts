import { createSlice } from '@reduxjs/toolkit'

enum UserRoles {
    ADMIN = 'ADMIN',
    USER = 'USER',
    GUEST = 'GUEST',
}

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
        const userData = JSON.parse(jsonData) as Omit<AuthState, 'isAuthprized'>
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
})

export default authSlice

export const authActions = authSlice.actions