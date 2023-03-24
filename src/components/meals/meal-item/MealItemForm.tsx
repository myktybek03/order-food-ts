import { ChangeEvent, FormEvent, useState } from 'react'
import { addToBasket } from '../../../store/basket/basket.thunk'
import { ReactComponent as PlusIcon } from '../../../assets/icons/plus.svg'
import { Button, styled, TextField } from '@mui/material'
import useAppDispatch from '../../../hooks/useAppDispatch'

type Props = {
    id: string
    title: string
    price: number
}

const MealItemForm = ({ id, title, price }: Props) => {
    const [amount, setAmount] = useState(1)

    const dispatch = useAppDispatch()

    const amountChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setAmount(+e.target.value)
    }

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const basketItem = {
            id,
            price,
            title,
            amount,
        }
        dispatch(addToBasket(basketItem))
    }

    return (
        <StyledForm onSubmit={submitHandler}>
            <Container>
                <StyledLabel htmlFor={id}>Amount</StyledLabel>
                <StyledText
                    id={id}
                    value={amount}
                    onChange={amountChangeHandler}
                />
            </Container>
            <ButtonStyle type="submit" variant="contained">
                <PlusIcon />
                Add
            </ButtonStyle>
        </StyledForm>
    )
}

export default MealItemForm

const StyledForm = styled('form')(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
}))

const Container = styled('div')(() => ({
    marginBottom: '15px',
}))

const StyledLabel = styled('label')(() => ({
    fontWeight: 600,
    fontSize: '1.125rem',
    lineHeight: '1.6875rem',
    margin: '0 1.25rem 0 0',
}))

const ButtonStyle = styled(Button)(() => ({
    background: '#8A2B06',
    '&:hover': {
        background: '#451907',
    },
}))

const StyledText = styled(TextField)(() => ({
    width: '70px',
    height: '10px',
    outline: 'none',
    borderRadius: '6px',
    fontWeight: '500',
    fontSize: '16px',
}))
