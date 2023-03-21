import { UserRoles } from '../common/types'
import { axiosInstance } from '../config/axiosInstance'
import { mainApi } from './instances'

type SignInResponse = {
    data: {
        token: string
        user: {
            role: UserRoles
            email: string
            name: string
        }
    }
}

const signIn = (data: { email: string; password: string }) => {
    return mainApi.post<SignInResponse>('auth/login', data)
}

const signUp = (data: { email: string; password: string; name: string }) => {
    return axiosInstance.post<SignInResponse>('auth/register', data)
}

export default { signIn, signUp }
