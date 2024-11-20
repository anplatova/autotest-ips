import { LabelData } from "../data/label.data"

type LabelModel = {
    color?: string,
    description?: string,
    name: string,
}

function createLabelModel(data: LabelData): LabelModel {
    return {
        color: data.color,
        description: data.description,
        name: data.name,
    }
}

export {
    LabelModel,
    createLabelModel,
}