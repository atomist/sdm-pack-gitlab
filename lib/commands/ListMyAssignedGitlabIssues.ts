/*
 * Copyright © 2018 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
class ListMyAssignedGitlabIssuesParameters {
    @Parameter({
        displayName: "Issue state filter",
        description: "issue state filter",
        pattern: /^(opened|closed)$/,
        validInput: "opened or closed",
        minLength: 1,
        maxLength: 120,
        required: false,
    })
    public state: string;

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
                title: "IssueDescription",
                value: issue.description,
            },
        ],
        fallback: `Id: ${issue.id}\nTitle: ${issue.title}\nDescription: ${issue.description}`,
    };
}

async function listMyAssignedGitlabIssues(
    parameters: ListMyAssignedGitlabIssuesParameters,
    messageClient: MessageClient & SlackMessageClient): Promise<any> {
    const token = configurationValue(GITLAB_TOKEN_CONFIG_KEY);
    const api = new Issues({
        token,
        url: parameters.url,
    });
    const projectId = `${parameters.owner}%2f${parameters.repo}`;
    const response: GitlabIssue[] = api.all({
        projectId,
        state: "opened",
        scope: "assigned_to_me",
    });
    const message: SlackMessage = {
        text: "These issues were assigned to you:",
        attachments: response.map(gitlabIssueToAttachment),
    };
    return messageClient.respond(message);
}

export const ListMyAssignedGitlabIssues: CommandHandlerRegistration<ListMyAssignedGitlabIssuesParameters> = {
    intent: "list my assigned gitlab issues",
    name: "Add Gitlab issue",
    paramsMaker: ListMyAssignedGitlabIssuesParameters,
    listener: cli => listMyAssignedGitlabIssues(cli.parameters, cli.context.messageClient),
};
