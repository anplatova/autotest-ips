import { auth } from '../../../credential'

type UserData = {
    login: string,
    email: string,
    password: string,
}

const userData: UserData = {
    login: auth.login,
    email: auth.email,
    password: auth.password,
}

export {
    UserData,
    userData,
}