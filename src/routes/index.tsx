import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

import ProtectedRoute from './ProtectedRoute'
import UserLayout from '../layout/user'
import AdminLayout from '../layout/admin'
import SignIn from '../pages/guest/SignIn'
import { UserRoles } from '../common/utils/types'
// import SignUp from '../pages/guest/SignUp'

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
                            component={() => <p>MealsPage</p>}
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
                            component={() => <p>Order</p>}
                        />
                    }
                />
                {/* <Route
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
                /> */}
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
                            component={() => <p>AdminMeals</p>}
                        />
                    }
                />
                <Route
                    path="orders"
                    element={
                        <ProtectedRoute
                            isAllowed={isAllowed([UserRoles.ADMIN])}
                            fallBackPath="/"
                            component={() => <p>Orders</p>}
                        />
                    }
                />
            </Route>
            <Route path="*" element={<p>Not Found</p>} />
        </Routes>
    )
}

export default AppRoutes
