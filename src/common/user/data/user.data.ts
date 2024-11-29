import { auth, authCommentator } from '../../../../credential'

type UserData = {
    login: string,
    email: string,
    password: string,
    repo: string,
}

const userData: UserData = {
    login: auth.login,
    email: auth.email,
    password: auth.password,
    repo: auth.repo,
}

const commenterData: UserData = {
    login: authCommentator.login,
    email: authCommentator.email,
    password: authCommentator.password,
    repo: authCommentator.repo,
}

export {
    commenterData,
    UserData,
    userData,
}