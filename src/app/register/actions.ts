'use server'

export const register = async (username: string, email: string, password: string) => {
    console.log('Registering user:', username);
    console.log('Registering email:', email);
    console.log('Registering password:', password);
}