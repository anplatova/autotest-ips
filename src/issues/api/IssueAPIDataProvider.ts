import { IssueModel } from "../model/issue.model";
import { LabelModel } from "../model/label.model"

type CreateLabelData = {
    name: string,
    color?: string,
    description?: string,
}

type CreateIssueWithLabels = {
    title: string;
    body?: string,
    labels?: string[],
}

class IssueAPIDataProvider {
    public static getLabelData(label: LabelModel): CreateLabelData {
        const data: CreateLabelData = {
            name: label.name
        }
        if (label.color) {
            data.color = label.color
        }
        if (label.description) {
            data.description = label.description
        }
        return data
    }

    public static getIssueWithLabelsData(issue: IssueModel): CreateIssueWithLabels {
        const dataIssue: CreateIssueWithLabels = {
            title: issue.title
        }
        if (issue.body) {
            dataIssue.body = issue.body
        }
        if (issue.labels) {
            dataIssue.labels = issue.labels.map(item => item.name)
        }
        return dataIssue
    }
}

export {
    CreateLabelData,
    CreateIssueWithLabels,
    IssueAPIDataProvider,
}