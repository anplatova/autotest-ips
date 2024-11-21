import { LabelModel } from "../model/label.model"

type CreateLabelData = {
    name: string,
    color?: string,
    description?: string,
}

class IssueAPIDataProvider {
    public static getLabelData(label: LabelModel): CreateLabelData {
        const data: LabelModel = {
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
    CreateLabelData,
    IssueAPIDataProvider,
}