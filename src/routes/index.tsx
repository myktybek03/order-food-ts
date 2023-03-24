import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import ProtectedRoute from './ProtectedRoute'
import UserLayout from '../layout/user'
import AdminLayout from '../layout/admin'
import SignIn from '../pages/guest/SignIn'
import { UserRoles } from '../common/types'
import SignUp from '../pages/guest/SignUp'
import Meals from '../pages/admin/Meals.page'
import Orders from '../pages/admin/Orders.page'
import MealsUser from '../pages/user/Meals.page'
import Order from '../pages/user/Order.page'

const AppRoutes = () => {
    const role = useSelector((state: RootState) => state.auth.user.role)

    const isAllowed = (roles: UserRoles[]) => {
        return roles.includes(role)
    }
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoute
                        isAllowed={isAllowed([UserRoles.GUEST, UserRoles.USER])}
                        fallBackPath="/admin/meals"
                        component={UserLayout}
                    />
                }
            >
                <Route
                    index
                    element={
                        <ProtectedRoute
                            isAllowed={isAllowed([
                                UserRoles.GUEST,
                                UserRoles.USER,
                            ])}
                            fallBackPath="/admin/meals"
                            component={MealsUser}
                        />
                    }
                />
                <Route
                    path="my-order"
                    element={
                        <ProtectedRoute
                            isAllowed={isAllowed([
                                UserRoles.GUEST,
                                UserRoles.USER,
                            ])}
                            fallBackPath="/admin/meals"
                            component={Order}
                        />
                    }
                />
                <Route
                    path="signup"
                    element={
                        <ProtectedRoute
                            isAllowed={isAllowed([
                                UserRoles.GUEST,
                                UserRoles.USER,
                            ])}
                            fallBackPath={
                                role === UserRoles.ADMIN ? '/admin/meals' : '/'
                            }
                            component={SignUp}
                        />
                    }
                />
                <Route
                    path="signin"
                    element={
                        <ProtectedRoute
                            isAllowed={isAllowed([
                                UserRoles.GUEST,
                                UserRoles.USER,
                            ])}
                            fallBackPath={
                                role === UserRoles.ADMIN ? '/admin/meals' : '/'
                            }
                            component={SignIn}
                        />
                    }
                />
            </Route>

            <Route
                path="/admin"
                element={
                    <ProtectedRoute
                        isAllowed={isAllowed([UserRoles.ADMIN])}
                        fallBackPath="/"
                        component={AdminLayout}
                    />
                }
            >
                <Route
                    path="meals"
                    element={
                        <ProtectedRoute
                            isAllowed={isAllowed([UserRoles.ADMIN])}
                            fallBackPath="/"
                            component={Meals}
                        />
                    }
                />
                <Route
                    path="orders"
                    element={
                        <ProtectedRoute
                            isAllowed={isAllowed([UserRoles.ADMIN])}
                            fallBackPath="/"
                            component={Orders}
                        />
                    }
                />
            </Route>
            <Route path="*" element={<p>Not Found</p>} />
        </Routes>
    )
}

export default AppRoutes
