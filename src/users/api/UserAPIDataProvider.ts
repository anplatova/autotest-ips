import { UserModel } from "../model/user.model";

type PatchUserRequest = {
    name: string,
    company: string,
}

class UserAPIDataProvider {
    public static getUserData(user: UserModel): PatchUserRequest {
        return {
            name: user.name,
            company: user.company,
        }
    }
}

export {
    PatchUserRequest,
    UserAPIDataProvider,
}