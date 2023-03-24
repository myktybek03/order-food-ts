import { Modal, Grid, TextField, Button, Box, styled } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import mealsService from '../../../../api/mealsService'
import { addMeals } from '../../../../store/meals/meals.thunk'
import useAppDispatch from '../../../../hooks/useAppDispatch'

const schema = zod.object({
    title: zod.string().nonempty(),
    description: zod.string().nonempty(),
    price: zod.number().min(2),
})
export type FormSchema = (typeof schema)['_output']

type Props = {
    open: boolean
    onClose: () => void
    onSubmit: (id: string, values: FormSchema) => void
}

const StyledBox = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 300,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
}

const MealModal = ({ open, onClose, onSubmit }: Props) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const dispatch = useAppDispatch()

    const { register, handleSubmit, formState, reset } = useForm({
        defaultValues: {
            price: 1,
            title: '',
            description: '',
        },
        resolver: zodResolver(schema),
    })

    useEffect(() => {
        const mealId = searchParams.get('mealId')
        if (open && searchParams.get('modal') === 'edit' && mealId) {
            mealsService.getMealById(mealId).then(({ data }) => {
                reset(data.data)
            })
        }
    }, [open])

    const id = searchParams.get('mealId') || '0'

    const submitHandler = (values: FormSchema) => {
        open && searchParams.get('modal') === 'edit'
            ? onSubmit(id, values)
            : dispatch(addMeals(values)).then(() => onClose())
        console.log(values)
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={StyledBox}>
                <GridStyle>
                    <FormStyle onSubmit={handleSubmit(submitHandler)}>
                        <TextField
                            {...register('title')}
                            label="Title"
                            error={!!formState.errors.title}
                        />
                        <TextField
                            {...register('description')}
                            label="Description"
                            error={!!formState.errors.description}
                        />
                        <TextField
                            type="number"
                            {...register('price', { valueAsNumber: true })}
                            label="Price"
                            error={!!formState.errors.price}
                        />
                        <ButtonsStyle>
                            <ButtonStyle
                                type="submit"
                                variant="outlined"
                                color="primary"
                            >
                                Save
                            </ButtonStyle>
                            <ButtonStyle
                                variant="outlined"
                                color="info"
                                onClick={onClose}
                            >
                                Cancel
                            </ButtonStyle>
                        </ButtonsStyle>
                    </FormStyle>
                </GridStyle>
            </Box>
        </Modal>
    )
}

export default MealModal

const FormStyle = styled('form')(() => ({
    display: 'grid',
    gap: '10px',
}))

const GridStyle = styled(Grid)(() => ({
    backgroundColor: '#fff',
}))

const ButtonsStyle = styled(Grid)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '10px',
}))

const ButtonStyle = styled(Button)(() => ({
    backgroundColor: '#8A2B06',
    color: '#ffff',
    '&:hover': {
        background: '#451907',
    },
}))
