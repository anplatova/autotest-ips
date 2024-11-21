import { getRandomString } from "../../common/data/functions/randomString"
import { LabelData } from "../data/label.data"

type LabelModel = {
    color?: string,
    description?: string,
    name: string,
}

function createLabelModel(data?: LabelData): LabelModel {
    const labelModel: LabelModel = {
        name: data?.name ?? getRandomString(6),
    }
    if (data?.color) {
        labelModel.color = data.color
    }
    if (data?.description) {
        labelModel.description = data.description
    }
    return labelModel
}

export {
    LabelModel,
    createLabelModel,
}