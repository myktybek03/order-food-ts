import { UserRoles } from '../common/types'
import { axiosInstance } from '../config/axiosInstance'
import { mainApi } from './instances'

// type SignInUser = { email: string; password: string }
// export const signInRequest = (values: SignInUser) => {
//     return axiosInstance.post('auth/login', values)
// }
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

type SignUpUser = {
    name: string
    email: string
    password: string
    confirm: string
    role: string
}
const signUp = (data: { email: string; password: string; name: string }) => {
    return axiosInstance.post<SignInResponse>('auth/register', data)
}

export default { signIn, signUp }
