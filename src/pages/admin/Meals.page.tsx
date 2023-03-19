import { Grid, Button } from '@mui/material'
import IconButton from '@mui/material/IconButton/IconButton'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMeals } from '../../store/meals/meals.thunk'
import { AppDispatch, RootState } from '../../store/store'
import { Meal } from '../../common/types'

type Column = {
    header: string
    key: string
    minWidth?: string | number
    align?: 'left' | 'right' | 'center'
    index?: boolean
    render?: (meal: Meal) => JSX.Element
}

const Meals = () => {
    const dispatch = useDispatch<AppDispatch>()

    const meals = useSelector((state: RootState) => state.meals.items)

    console.log(meals)

    useEffect(() => {
        dispatch(getAllMeals())
    }, [])

    const deleteMealHandler = (id: string) => {
        console.log(id)

        // dispatch(deleteMeal(id))
    }
    const editMealHandler = (id: string) => {
        console.log(id)

        // dispatch(deleteMeal(id))
    }

    const columns: Column[] = [
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
            render: (meal) => (
                <Grid>
                    <IconButton>
                        <EditIcon onClick={() => editMealHandler(meal._id)} />
                    </IconButton>
                    <IconButton onClick={() => deleteMealHandler(meal._id)}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>
            ),
        },
    ]

    return (
        <Grid>
            <Button>Add new meal</Button>
            <Grid>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.key}
                                            align={column.align || 'left'}
                                            style={
                                                column.minWidth
                                                    ? {
                                                          minWidth:
                                                              column.minWidth,
                                                      }
                                                    : {}
                                            }
                                        >
                                            {column.header}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {meals.map((meal, rowIndex) => {
                                    return (
                                        <TableRow
                                            hover
                                            // role="checkbox"
                                            tabIndex={-1}
                                            key={meal._id}
                                        >
                                            {columns.map((column) => {
                                                if (column.render) {
                                                    return column.render(meal)
                                                }

                                                const value = column.index
                                                    ? rowIndex + 1
                                                    : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                                      //@ts-ignore
                                                      meal[column.key]
                                                return (
                                                    <TableCell
                                                        key={column.key}
                                                        align={column.align}
                                                    >
                                                        {value}
                                                    </TableCell>
                                                )
                                            })}
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {/* <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    /> */}
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Meals
