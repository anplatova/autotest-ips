import { CreateLabelResponse, IssueAPIService } from "../api/IssueAPIService"
import { issueData } from "../data/issue.data"
import { createLabelModel, LabelModel } from "../model/label.model"

describe('Test API', () => {
    it('', async () => {
        const label: LabelModel = createLabelModel(LabelData)
        const response: CreateLabelResponse = await IssueAPIService.createLabel(label)
        console.log(response)
    })
})