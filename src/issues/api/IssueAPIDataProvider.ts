import { IssueModel } from "../model/issue.model";
import { LabelModel } from "../model/label.model"

type CreateLabelData = {
    name: string,
    color?: string,
    description?: string,
}

type CreateIssueData = {
    title: string;
    body?: string,
    labels?: string[],
}

type AddLabelsToAnIssueData = {
    labels: string[],
}

class IssueAPIDataProvider {
    public static addLabelsToAnIssueData(labels: LabelModel[]): AddLabelsToAnIssueData {
        return {
            labels: labels.map(item => item.name)
        }
    }

    public static getIssueData(issue: IssueModel): CreateIssueData {
        const dataIssue: CreateIssueData = {
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
}

export {
    AddLabelsToAnIssueData,
    CreateLabelData,
    CreateIssueData,
    IssueAPIDataProvider,
}