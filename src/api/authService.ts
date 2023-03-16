import { axiosInstance } from '../config/axiosInstance'

type logInUser = { email: string; password: string }
export const signInRequest = (values: logInUser) => {
    return axiosInstance.post('auth/login', values)
}
