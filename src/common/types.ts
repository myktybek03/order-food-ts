export enum UserRoles {
    ADMIN = 'ADMIN',
    USER = 'USER',
    GUEST = 'GUEST',
}

export interface Meal {
    readonly _id: string
    price: number
    title: string
    amount: number
    description: string
}

export type Column<T> = {
    header: string
    key: string
    minWidth?: string | number
    align?: 'left' | 'right' | 'center'
    index?: boolean
    render?: (meal: T) => JSX.Element
}

export type EditMeal = {
    id: string
    values: {
        price: number
        title: string
        description: string
    }
}

export interface Order {
    amount: number
    food: null
    price: number
    description: string
    title: string
    readonly _id: string
}

type ItemType = {
    _id: string
    title: string
    amount: number
    price: number
}
export type MealType = {
    createdAt: string
    items: ItemType[]
    totalPrice: number
    user: {
        _id: string
        name: string
    }
    readonly _id: string
}

export type BasketData = {
    id: string
    price: number
    title: string
    amount: number
}

export type Error = {
    isLoading: boolean
    error: boolean
}
