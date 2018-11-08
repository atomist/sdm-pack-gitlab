import {
    configurationValue,
    GitlabPrivateTokenCredentials,
    HandlerContext,
    ProjectOperationCredentials,
    RemoteRepoRef,
} from "@atomist/automation-client";
import { CredentialsResolver } from "@atomist/sdm";

export class GitlabPrivateTokenCredentialsResolver implements CredentialsResolver {
    public commandHandlerCredentials(context: HandlerContext, id: RemoteRepoRef): ProjectOperationCredentials {
        const creds: GitlabPrivateTokenCredentials = {privateToken: configurationValue("sdm.gitlab.token")};
        return creds;
    }

    public eventHandlerCredentials(context: HandlerContext, id: RemoteRepoRef): ProjectOperationCredentials {
        const creds: GitlabPrivateTokenCredentials = {privateToken: configurationValue("sdm.gitlab.token")};
        return creds;
    }
}
