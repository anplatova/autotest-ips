import { CreateLabelResponse, IssueAPIService } from "../api/IssueAPIService"
import { createLabelModel, LabelModel } from "../model/label.model"

describe('Test API', () => {
    const label: LabelModel = createLabelModel()

    it('Create label', async () => {
        const response: CreateLabelResponse = await IssueAPIService.createLabel(label)
        console.log(response.name)
        console.log(label)
    })

    it('Delete label', async () => {
        await IssueAPIService.deleteLabel(label)
        await IssueAPIService.deleteLabel({ name: '7okGCJ' })
    })
})