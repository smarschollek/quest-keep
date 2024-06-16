'use server'
import { hashPassword } from '@/utils/password';
import { addUser, checkIfEmailIsFree, checkIfUsernameIsFree } from '@/utils/db';
import { convertZodErrorToState, loginUserFormShema, registerUserFormSchema } from '@/utils/validation';
import { ZodError } from 'zod';
import { State } from '@/types';
import { signIn } from '@/auth';

export const loginUser = async (prevState: State | null, data: FormData) : Promise<State> => {

    try {
        const {email, password} = loginUserFormShema.parse(data)
        
        await signIn('credentials', { redirect: false, email, password })

        return {
            status: 'success',
            message: 'User logged in successfully'
        }    
    } catch (error) {
        return {
            status: 'error',
            message: 'An error occurred'
        }
    }
}

export const registerNewUser = async (prevState: State | null, data : FormData) : Promise<State> => {
    try {
        const { email, password, username } = registerUserFormSchema.parse(data)

        const [isEmailFree, isUsernameFree] = await Promise.all([
            checkIfEmailIsFree(email),
            checkIfUsernameIsFree(username)
        ]) 

        if(isEmailFree === false || isUsernameFree === false) {
            const errors = []

            if(!isEmailFree) {
                errors.push({
                    path: 'email',
                    message: 'Email is already taken'
                })
            }

            if(!isUsernameFree) {
                errors.push({
                    path: 'username',
                    message: 'Username is already taken'
                })
            }

            return {
                status: 'error',
                message: 'Validation error',
                errors
            }
        }

        const hashedPassword = await hashPassword(password);
        await addUser({        
            name: username,
            email,
            password: hashedPassword
        })

        return {
            status: 'success',
            message: 'User registered successfully'
        }
    } catch (error) {
        if(error instanceof ZodError) {
            return convertZodErrorToState(error)
        }

        return {
            status: 'error',
            message: 'An error occurred'
        }
    } 
}