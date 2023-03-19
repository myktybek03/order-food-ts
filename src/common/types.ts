export enum UserRoles {
    ADMIN = 'ADMIN',
    USER = 'USER',
    GUEST = 'GUEST',
}

export interface Meal {
    readonly _id: string
    price: number
    title: string
    amount: string
    description: string
}
