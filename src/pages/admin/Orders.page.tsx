import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useAppDispatch from '../../hooks/useAppDispatch'
import { getAllOrder } from '../../store/orders/orders.thunk'
import { RootState } from '../../store/store'
import { Column, MealType } from '../../common/types'
import { Grid } from '@mui/material'
import AppTable from '../../components/UI/Table'

const Orders = () => {
    const dispatch = useAppDispatch()
    const items = useSelector((state: RootState) => state.order.allOrder)
    console.log(items)

    useEffect(() => {
        dispatch(getAllOrder())
    }, [dispatch])

    const columns: Column<MealType>[] = [
        {
            header: '№',
            key: '_id',
            index: true,
        },
        {
            header: 'Author',
            key: 'name',
            render: (meal: MealType) => <Grid>{meal.user.name}</Grid>,
        },
        {
            header: 'Title',
            key: 'title',
            render: (meal: MealType) => (
                <Grid>
                    {meal.items.map((item) => (
                        <p key={item._id}>{item.title}</p>
                    ))}
                </Grid>
            ),
        },
        {
            header: 'Amount',
            key: 'amount',
            render: (meal: MealType) => (
                <Grid>
                    {meal.items.map((item) => (
                        <p key={item._id}>{item.amount}</p>
                    ))}
                </Grid>
            ),
        },
        {
            header: 'Total Price',
            key: 'totalPrice',
        },
    ]
    return (
        <div>
            <AppTable
                columns={columns}
                rows={items}
                getUniqueId={(val) => val._id}
            />
        </div>
    )
}

export default Orders
