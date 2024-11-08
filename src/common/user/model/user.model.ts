import { UserData } from '../data/user.data'

type UserModel = {
    login: string,
    email: string,
    password: string,
    name: string,
    company: string,
}

function createUserModel(data: UserData): UserModel {
    return {
        login: data.login,
        password: data.password,
        email: data.email,
        name: 'Test',
        company: 'Test Company',
    }
}

export {
    UserModel,
    createUserModel,
}