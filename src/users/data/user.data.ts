import { auth, email, login, password } from '../../../credential'

type UserData = {
    login: string,
    email: string,
    password: string,
}

const userData: UserData = {
    login: login,
    email: email,
    password: password,
}

export {
    UserData,
    userData,
}