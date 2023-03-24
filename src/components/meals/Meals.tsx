import { useEffect, memo } from 'react'
import { useSelector } from 'react-redux'
import { styled } from '@mui/material'
import { getAllMeals } from '../../store/meals/meals.thunk'
import MealItem from './meal-item/MealItem'
import useAppDispatch from '../../hooks/useAppDispatch'
import { RootState } from '../../store/store'

const Meals = () => {
    const { items } = useSelector((state: RootState) => state.meals)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAllMeals())
    }, [dispatch])

    return (
        <Card>
            <StyledUl>
                {items.map((item) => (
                    <MealItem key={item._id} item={item} />
                ))}
            </StyledUl>
        </Card>
    )
}

export default memo(Meals)

const Card = styled('div')(() => ({
    background: '#fff',
    borderRadius: '1rem',
    width: '64.9375rem',
    margin: '160px auto',
}))

const StyledUl = styled('ul')(() => ({
    listStyle: 'none',
    padding: '20px 40px',
}))
