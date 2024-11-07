import { UserData } from '../data/user.data'

type UserModel = {
    login: string,
    email: string,
    password: string,
    name: string,
    company: string,
    commentLogin: string,
    commentPassword: string,
}

function createUserModel(data: UserData): UserModel {
    return {
        login: data.login,
        password: data.password,
        email: data.email,
        name: 'Test',
        company: 'Test Company',
        commentLogin: data.commentLogin,
        commentPassword: data.commentPassword,
    }
}

export {
    UserModel,
    createUserModel,
}