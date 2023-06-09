import { Grid, TextField, Typography, Button } from '@mui/material'
import { styled } from '@mui/system'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { signIn } from '../../store/auth/auth.thunk'
import useAppDispatch from '../../hooks/useAppDispatch'

const SignIn = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [loginError, setLoginError] = useState('')

    const schema = z.object({
        email: z.string().email('Email жаз'),
        password: z.string().min(6, 'Password жаз'),
    })

    type FormSchema = (typeof schema)['_output']

    const { handleSubmit, register, formState } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onBlur',
        resolver: zodResolver(schema),
    })

    const submitHandler = (values: FormSchema) => {
        dispatch(signIn(values))
            .unwrap()
            .then(() => navigate('/'))
            .catch((e) => setLoginError(e))
    }

    return (
        <MainGrid>
            <GridContainer>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <FormGrid>
                        <TextField
                            error={!!formState.errors.email}
                            {...register('email', {
                                required: 'Please enter your email',
                            })}
                            label="Email"
                        />
                        {formState.errors.email && (
                            <Error>{formState.errors.email.message}</Error>
                        )}
                        <TextField
                            error={!!formState.errors.password}
                            {...register('password', {
                                required: 'Please enter your password',
                            })}
                            label="Password"
                        />
                        {formState.errors.password && (
                            <Error>{formState.errors.password.message}</Error>
                        )}
                        <ButtonsStyle>
                            <ButtonStyle type="submit">Sign In</ButtonStyle>
                        </ButtonsStyle>
                        <Link to="/signup">{`Don't have account`}</Link>
                    </FormGrid>
                </form>
            </GridContainer>
        </MainGrid>
    )
}

export default SignIn

const MainGrid = styled(Grid)(() => ({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '200px',
}))

const GridContainer = styled(Grid)(() => ({
    background: '#fff',
    width: '600px',
    padding: '20px',
    border: '3px solid #8A2B06',
    borderRadius: '10px',
}))

const FormGrid = styled(Grid)(() => ({
    display: 'grid',
    flexDirection: 'column',
    gap: '20px',
}))

const Error = styled(Typography)(() => ({
    color: '#f00',
    textAlign: 'center',
}))

const ButtonsStyle = styled(Grid)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
}))

const ButtonStyle = styled(Button)(() => ({
    backgroundColor: '#8A2B06',
    color: '#ffff',
    padding: '10px 30px',
    '&:hover': {
        background: '#451907',
    },
}))
