/* eslint-disable no-underscore-dangle */
import { styled } from '@mui/material'
import { Meal } from '../../../common/types'
import MealItemForm from './MealItemForm'

type Props = {
    item: Meal
}

const MealItem = ({ item }: Props) => {
    return (
        <StyledLi>
            <StyledInfoCard>
                <Title>{item.title}</Title>
                <Description>{item.description}</Description>
                <Price>${item.price}</Price>
            </StyledInfoCard>
            <MealItemForm id={item._id} title={item.title} price={item.price} />
        </StyledLi>
    )
}

export default MealItem

const Title = styled('h4')(() => ({
    fontWeight: 600,
    fontSize: '1.125rem',
    lineHeight: '1.6875rem',
    marginBottom: 0,
}))

const Description = styled('p')(() => ({
    fontStyle: 'italic',
    fontWeight: 400,
    fontSize: '1rem',
    lineHeight: '1.5rem',
    margin: 0,
}))

const Price = styled('span')(() => ({
    fontWeight: 700,
    fontSize: ' 1.25rem',
    lineHeight: '1.875rem',
    color: '#ad5502',
}))

const StyledLi = styled('li')(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '0.0625rem solid #d6d6d6',

    ':lastChild': {
        borderBottom: 'none',
    },
}))

const StyledInfoCard = styled('div')(() => ({
    marginBottom: '1.25rem',
}))
