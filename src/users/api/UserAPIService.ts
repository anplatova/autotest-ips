import { AxiosResponse } from "axios"
import { UserAPIProvider } from "./UserAPIProvider"
import { PatchUserRequest, UserAPIDataProvider } from "./UserAPIDataProvider"
import { UserModel } from "../model/user.model"

type GetUserResponse = {
    name: string,
    company: string,
    email: string,
}

class UserAPIService {
    public static async getUser(): Promise<GetUserResponse> {
        const userAPIProvider: UserAPIProvider = new UserAPIProvider()
        const response: AxiosResponse<GetUserResponse> = await userAPIProvider.getUser()
        return response.data
    }

    public static async patchUser(user: UserModel): Promise<GetUserResponse> {
        const data: PatchUserRequest = UserAPIDataProvider.getUserData(user)
        const userAPIProvider: UserAPIProvider = new UserAPIProvider()
        const response: AxiosResponse<GetUserResponse> = await userAPIProvider.patchUser(data)
        return response.data
    }
}

export {
    GetUserResponse,
    UserAPIService,
}