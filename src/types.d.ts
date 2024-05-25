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

export type Quest = {
    id: number
    name: string
    description: string | null
    image: string | null
    placeId: number
    creatorId: number
}

export type State = 
    { status: "success", message: string } |
    {
        status: "error";
        message: string;
        errors?: Array<{
            path: string;
                message: string;
        }>;
    } |
    null

export type AutocompleteOption = {
    value: number
    label: string
}

declare module 'next-auth' {
    interface Session {
      user: {
        id: string;
      } & DefaultSession['user'];
    }
  }