type State = "opened"|"closed";
type Id = number;
type Title = string;
type Description = string;

interface GitlabUser {
    readonly state: string;
    readonly id: number;
    readonly name: string;
}

export interface GitlabIssue {
    readonly state: State;
    readonly id: Id;
    readonly title: Title;
    readonly description?: Description;
    readonly author: GitlabUser;
    readonly assignees?: GitlabUser[];
    readonly assignee?: GitlabUser;
}
