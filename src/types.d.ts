export type User = {
    id: number
    email: string
    name: string
    password: string
}

export type Place = {
    id: number
    name: string
    description: string | null
    image: string | null
}
