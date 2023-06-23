export const getMockNode = (name) => {
    return {
        name: name ?? '',
        uniqueIndex: 0,
        childNodes: [],
        parentNode: null,
        isGithubIssue: false,
        nonGithubIssueDetail: {
            markAsDone: false,
        },
        issueDetails: {},
    };
}