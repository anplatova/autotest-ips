import { CreateIssueWithLabelsResponse, CreateLabelResponse, IssueAPIService } from "../api/IssueAPIService"
import { createIssueModel, IssueModel } from "../model/issue.model"
import { createLabelModel, LabelModel } from "../model/label.model"

describe('Test API', () => {
    const label: LabelModel = createLabelModel()
    const issue: IssueModel = createIssueModel({ labels: [label] })

    before(async () => {
        await IssueAPIService.createLabel(label)
    })

    it('Delete label', async () => {
        await IssueAPIService.deleteLabel(label)
        await IssueAPIService.deleteLabel({ name: '7okGCJ' })
    })

    it.only('Create issue with label', async () => {
        const responseIssue: CreateIssueWithLabelsResponse = await IssueAPIService.createIssueWithLabels(issue)
        console.log(responseIssue)
    })
})