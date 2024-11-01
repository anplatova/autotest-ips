import { GetUserResponse, UserAPIService } from "./api/UserAPIService"
import { userData } from "./data/user.data"
import { createUserModel, UserModel } from "./model/user.model"

describe('Test API', () => {
    it('', async () => {
        const response: GetUserResponse = await UserAPIService.getUser()
        console.log(response)

        const user: UserModel = createUserModel(userData)

        const patchResponse: GetUserResponse = await UserAPIService.patchUser(user)
        console.log(patchResponse)
    })
})