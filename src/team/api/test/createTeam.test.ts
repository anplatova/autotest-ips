import { AxiosResponse } from "axios"
import { CreateTeamRequest } from "../TeamAPIDataProvider"
import { TeamAPIProvider } from "../TeamAPIProvider"
import { CreateTeamResponce } from "../TeamAPIService"

const ORGANISATION_NAME = 'test-anplt'

describe('Create team test', () => {
    it('team should be created, code is OK', async () => {
        const data: CreateTeamRequest = {
            name: 'Team name' + (new Date()).getTime()
        }

        const teamAPIProvider: TeamAPIProvider = new TeamAPIProvider({
            isSuccesfulResponce: false,
        })

        const responce: AxiosResponse<CreateTeamResponce> = await teamAPIProvider.create(ORGANISATION_NAME, data)

        expect(responce.status).toEqual(201)
        expect(responce.data.name).toEqual(data.name)
        expect(responce.data.description).toBeNull()
        expect(responce.data.created_at.match(/\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\dZ/)![0]).toBeDefined()
    })
})