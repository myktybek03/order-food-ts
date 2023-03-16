import { FC } from 'react'
import { Navigate } from 'react-router-dom'

type Props = {
    component: FC
    fallBackPath: string
    isAllowed: boolean
}

const ProtectedRoute = ({
    component: Component,
    fallBackPath,
    isAllowed,
}: Props) => {
    if (!isAllowed) {
        return <Navigate to={fallBackPath} />
    }
    return <Component />
}

export default ProtectedRoute
