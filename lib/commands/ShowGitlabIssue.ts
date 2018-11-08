import {
    configurationValue,
    MappedParameter,
    MappedParameters,
    MessageClient,
    Parameter,
    Parameters,
    SlackMessageClient,
} from "@atomist/automation-client";
import {
    CommandHandlerRegistration,
} from "@atomist/sdm";
import {
    Attachment,
    SlackMessage,
} from "@atomist/slack-messages";
import {
    Issues,
} from "gitlab";
import { GITLAB_TOKEN_CONFIG_KEY } from "../common/constants";
import { GitlabIssue } from "../common/GitlabIssue";

@Parameters()
class ShowGitlabIssueParameters {
    @Parameter({
        displayName: "Issue ID",
        description: "issue id",
        pattern: /^[0-9]*$/,
        validInput: "a number",
        minLength: 1,
        maxLength: 120,
        required: true,
    })
    public issueId: number;

    @MappedParameter(MappedParameters.GitHubRepository)
    public repo: string;

    @MappedParameter(MappedParameters.GitHubOwner)
    public owner: string;

    @MappedParameter(MappedParameters.GitHubRepositoryProvider)
    public providerId: string;

    @MappedParameter(MappedParameters.GitHubUrl)
    public url: string;

    @MappedParameter(MappedParameters.SlackChannelName, false)
    public channelName: string;

    @MappedParameter(MappedParameters.SlackTeam, false)
    public teamId: string;

}

function gitlabIssueToAttachment(issue: GitlabIssue): Attachment {
    return {
        color: "#00DD00",
        fields: [
            {
                title: "Issue id",
                value: issue.id.toString(),
            },
            {
                title: "Title",
                value: issue.title,
            },
            {
                title: "Description",
                value: issue.description,
            },
        ],
        fallback: `Id: ${issue.id}\nTitle: ${issue.title}\nDescription: ${issue.description}`,
    };
}

async function showGitlabIssue(
    parameters: ShowGitlabIssueParameters,
    messageClient: MessageClient & SlackMessageClient): Promise<any> {
    const token = configurationValue(GITLAB_TOKEN_CONFIG_KEY);
    const api = new Issues({
        token,
        url: parameters.url,
    });
    const projectId = `${parameters.owner}%2f${parameters.repo}`;
    const response: GitlabIssue = api.show(projectId, parameters.issueId);
    const message: SlackMessage = {
        text: "Issue details:",
        attachments: [gitlabIssueToAttachment(response)],
    };
    return messageClient.respond(message);
}

export const ShowGitlabIssue: CommandHandlerRegistration<ShowGitlabIssueParameters> = {
    intent: "show gitlab issue",
    name: "Show Gitlab issue",
    paramsMaker: ShowGitlabIssueParameters,
    listener: cli => showGitlabIssue(cli.parameters, cli.context.messageClient),
};
