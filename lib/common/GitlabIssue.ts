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

enum UserState {
    active,
    inactive,
}
type UserId = string;
type UserName = string;
interface GitlabUser {
    readonly state: UserState;
    readonly id: UserId;
    readonly name: UserName;
}

enum IssueState {
    opened,
    closed,
}
type IssueId = number;
type IssueTitle = string;
type IssueDescription = string;
export interface GitlabIssue {
    readonly state: IssueState;
    readonly id: IssueId;
    readonly title: IssueTitle;
    readonly description?: IssueDescription;
    readonly author: GitlabUser;
    readonly assignees?: GitlabUser[];
    readonly assignee?: GitlabUser;
}
