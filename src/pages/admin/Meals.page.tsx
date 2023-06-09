import { Button, Grid, styled } from '@mui/material'
import IconButton from '@mui/material/IconButton/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    deleteMeal,
    editMeal,
    getAllMeals,
} from '../../store/meals/meals.thunk'
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
            header: 'Description',
            key: 'description',
        },
        {
            header: 'Price',
            key: 'price',
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

    const saveHandler = (id: string, values: FormSchema) => {
        dispatch(editMeal({ id, values }))
        // console.log(values)
    }

    const isModalOpen = !!params.get('modal')

    return (
        <Grid>
            <GridStyle>
                <ButtonStyle
                    variant="contained"
                    onClick={() => showModalHandler('add')}
                >
                    Add new meal
                </ButtonStyle>
            </GridStyle>
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

const ButtonStyle = styled(Button)(() => ({
    backgroundColor: '#8A2B06',
    color: '#fff',
    borderRadius: '10px',
    padding: '10px 25px',
    '&:hover': {
        background: '#451907',
    },
}))

const GridStyle = styled(Grid)(() => ({
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '30px',
}))
