type IssueModel = {
    title: string,
    description: string
}

function createIssueModel(entities?: Partial<IssueModel>): IssueModel {
    return {
        title: entities?.title ??
            description: entities?.description
    }
}