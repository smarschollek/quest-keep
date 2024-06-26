import bcrypt from 'bcrypt';

export const hashPassword = async (str: string) => {
    const salt = process.env.SALT_ROUNDS
    
    if(salt === undefined) {
        throw new Error('HASH_SALT is not defined')
    }

    console.log(salt);

    
    const saltRouds = await bcrypt.genSalt(parseInt(salt))

    return bcrypt.hash(str, saltRouds)
}

export const comparePassword = async (str: string, hash: string) => {
    return bcrypt.compare(str, hash)
}