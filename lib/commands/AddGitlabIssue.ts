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
    Parameter,
    Parameters,
} from "@atomist/automation-client";
import {
    CommandHandlerRegistration,
} from "@atomist/sdm";
import {
    Issues,
} from "gitlab";
import { GITLAB_TOKEN_CONFIG_KEY } from "../common/constants";

@Parameters()
class AddGitlabIssueParameters {
    @Parameter({
        displayName: "Issue Title",
        description: "title of issue",
        pattern: /^.*$/,
        validInput: "a single line of text",
        minLength: 1,
        maxLength: 120,
        required: true,
    })
    public title: string;

    @Parameter({
        displayName: "Issue Body",
        description: "descriptive text for issue",
        pattern: /[\s\S]*/,
        validInput: "free text, up to 1000 characters",
        minLength: 0,
        maxLength: 1000,
        required: false,
    })
    public body: string = "";

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

async function createGitlabIssue(parameters: AddGitlabIssueParameters): Promise<any> {
    const token = configurationValue<string>(GITLAB_TOKEN_CONFIG_KEY);
    const api = new Issues({
        token,
        url: parameters.url,
    });
    const projectId = `${parameters.owner}%2f${parameters.repo}`;
    return api.create(projectId, {
        id: projectId,
        title: parameters.title,
        description: parameters.body,
    });

}

export const AddGitlabIssue: CommandHandlerRegistration<AddGitlabIssueParameters> = {
    intent: "add gitlab issue",
    name: "Add Gitlab issue",
    paramsMaker: AddGitlabIssueParameters,
    listener: cli => createGitlabIssue(cli.parameters),
};
