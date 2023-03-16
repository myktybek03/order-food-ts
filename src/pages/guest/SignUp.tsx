import { Grid, TextField, Typography, Button } from '@mui/material'
import { styled } from '@mui/system'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { AppDispatch } from '../../store/store'
import { signIn } from '../../store/auth/auth.thunk'

const SignUp = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [loginError, setLoginError] = useState('')

    const schema = z.object({
        name: z.string().email('Атынды жаз'),
        email: z.string().email('Email жаз'),
        password: z.string().min(6, 'Password жаз'),
    })

    type FormSchema = (typeof schema)['_output']

    const { getValues, handleSubmit, register, formState } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
        mode: 'onBlur',
        resolver: zodResolver(schema),
    })

    const submitHandler = (values: FormSchema) => {
        console.log(values)

        dispatch(signIn(values))
            .unwrap()
            .then(() => navigate('/'))
            .catch((e) => setLoginError(e.response.data.message))
    }

    return (
        <MainGrid>
            <GridContainer>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <FormGrid>
                        <TextField
                            error={!!formState.errors.name}
                            {...register('name', {
                                required: 'Please enter your name',
                            })}
                            label="Name"
                        />
                        {formState.errors.name && (
                            <Error>{formState.errors.name.message}</Error>
                        )}
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
                        <Button type="submit">Sign up</Button>
                        <Link to="/signin">Have an account</Link>
                    </FormGrid>
                </form>
            </GridContainer>
        </MainGrid>
    )
}

export default SignUp

const MainGrid = styled(Grid)(() => ({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '100px',
}))

const GridContainer = styled(Grid)(() => ({
    background: '#fff',
    width: '600px',
    padding: '20px',
    border: '3px solid #00BFFF',
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
