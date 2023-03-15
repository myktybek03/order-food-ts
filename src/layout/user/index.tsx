import React, { useState, useCallback } from 'react'
import { Outlet } from 'react-router-dom'

const User = () => {
    const [isBasketVisible, setIsBasketVisible] = useState(false)

    return (
        <>
            <div>
                <Outlet />
            </div>
        </>
    )
}

export default User
