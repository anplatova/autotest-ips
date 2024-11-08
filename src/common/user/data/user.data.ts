import { auth, authCommentator } from '../../../../credential'

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

const commenterData: UserData = {
    login: authCommentator.login,
    email: authCommentator.email,
    password: authCommentator.password,
}

export {
    commenterData,
    UserData,
    userData,
}