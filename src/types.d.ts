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