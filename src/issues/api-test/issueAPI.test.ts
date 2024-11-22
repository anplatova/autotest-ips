import { CreateIssueWithLabelsResponce, CreateLabelResponse, IssueAPIService } from "../api/IssueAPIService"
import { createIssueModel, IssueModel } from "../model/issue.model"
import { createLabelModel, LabelModel } from "../model/label.model"

describe('Test API', () => {
    const label: LabelModel = createLabelModel()
    const issue: IssueModel = createIssueModel()

    it('Create label', async () => {
        const response: CreateLabelResponse = await IssueAPIService.createLabel(label)
        console.log(response.name)
        console.log(label)
    })

    it('Delete label', async () => {
        await IssueAPIService.deleteLabel(label)
        await IssueAPIService.deleteLabel({ name: '7okGCJ' })
    })

    it('Create issue with label', async () => {
        const responseIssue: CreateIssueWithLabelsResponce = await IssueAPIService.createIssueWithLabels(issue)
        console.log(responseIssue)
    })
})