import { AppBar, Button, Grid, Toolbar } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { styled } from '@mui/system'
import { signOut } from '../../store/auth/auth.thunk'
import useAppDispatch from '../../hooks/useAppDispatch'

const menus = [
    {
        path: 'meals',
        title: 'Meals',
    },
    {
        path: 'orders',
        title: 'Orders',
    },
]

const AdminHeader = () => {
    const dispatch = useAppDispatch()

    const signOutHandler = () => {
        dispatch(signOut())
    }

    return (
        <AppBar>
            <ToolBarStyle>
                <Appbar>
                    <StyledGrid>
                        {menus.map((item) => (
                            <StyledNavLink key={item.path} to={item.path}>
                                {item.title}
                            </StyledNavLink>
                        ))}
                    </StyledGrid>
                    <Button color="inherit" onClick={signOutHandler}>
                        SignOut
                    </Button>
                </Appbar>
            </ToolBarStyle>
        </AppBar>
    )
}

export default AdminHeader

const Appbar = styled(Grid)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
}))

const ToolBarStyle = styled(Toolbar)(() => ({
    background: '#8A2B06',
}))

const StyledGrid = styled(Grid)(() => ({
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
}))

const StyledNavLink = styled(NavLink)(() => ({
    textDecoration: 'none',
    color: '#fff',

    '&:hover': {
        color: '#8a8a8a',
    },

    '&.active': {
        color: 'aqua',
    },
}))
