import { LabelModel } from "../model/label.model"

type CreateLabel = {
    name: string,
    color?: string,
    description?: string,
}

class IssueAPIDataProvider {
    public static getLabelData(label: LabelModel): CreateLabel {
        return {
            name: label.name,
            color: label.color,
            description: label.description,
        }
    }
}

export {
    CreateLabel,
    IssueAPIDataProvider,
}