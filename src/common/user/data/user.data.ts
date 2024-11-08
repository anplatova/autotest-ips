import { auth } from '../../../credential'

type UserData = {
    login: string,
    email: string,
    password: string,
    commentLogin: string,
    commentPassword: string,
}

const userData: UserData = {
    login: auth.login,
    email: auth.email,
    password: auth.password,
    commentLogin: auth.commentLogin,
    commentPassword: auth.commentPassword,
}

export {
    UserData,
    userData,
}