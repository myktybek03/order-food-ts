import { Button, Grid } from '@mui/material'
import IconButton from '@mui/material/IconButton/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMeal, getAllMeals } from '../../store/meals/meals.thunk'
import { AppDispatch, RootState } from '../../store/store'
import { Column, Meal } from '../../common/types'
import AppTable from '../../components/UI/Table'
import MealModal from '../../components/admin/pages/meals/MealModal'
import { FormSchema } from '../../components/admin/pages/meals/MealModal'
import { useSearchParams } from 'react-router-dom'

const Meals = () => {
    const dispatch = useDispatch<AppDispatch>()

    const meals = useSelector((state: RootState) => state.meals.items)

    const [params, setParams] = useSearchParams()

    useEffect(() => {
        dispatch(getAllMeals())
    }, [])

    const showModalHandler = (mode: 'add' | 'edit') => {
        params.set('modal', mode)
        setParams(params)
    }
    const closeModalHandler = () => {
        params.delete('modal')
        setParams(params)
    }

    const deleteMealHandler = (id: string) => {
        console.log(id)

        dispatch(deleteMeal(id))
    }

    const editMealHandler = (id: string) => {
        showModalHandler('edit')
        params.set('mealId', id)
        setParams(params)
    }

    const columns: Column<Meal>[] = [
        {
            header: '№',
            key: '_id',
            index: true,
        },
        {
            header: 'Title',
            key: 'title',
        },
        {
            header: 'Price',
            key: 'price',
        },
        {
            header: 'Description',
            key: 'description',
        },
        {
            header: 'Actions',
            key: 'actions',
            render: (meal: Meal) => (
                <Grid>
                    <IconButton onClick={() => editMealHandler(meal._id)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteMealHandler(meal._id)}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>
            ),
        },
    ]

    const saveHandler = (values: FormSchema) => {
        // dispatch(yourAction(values))
        console.log(values)
    }

    const isModalOpen = !!params.get('modal')

    return (
        <Grid>
            <Button variant="contained" onClick={() => showModalHandler('add')}>
                Add new meal
            </Button>
            <MealModal
                open={isModalOpen}
                onClose={closeModalHandler}
                onSubmit={saveHandler}
            />
            <Grid>
                <AppTable
                    columns={columns}
                    rows={meals}
                    getUniqueId={(val) => val._id}
                />
            </Grid>
        </Grid>
    )
}

export default Meals
