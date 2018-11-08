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
