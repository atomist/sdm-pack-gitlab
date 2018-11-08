declare module "gitlab" {
    export class Issues {
        constructor(options: {
            token?: any,
            oauthToken?: any,
            sudo?: any,
            url?: string,
            useXMLHttpRequest?: boolean,
            version?: string,
            rejectUnauthorized?: boolean,
        });

        public create(projectId: string, body: {id: string, title: string, description: string}): any;

        public all(params: {projectId: string, scope?: "created_by_me"|"assigned_to_me"|"all", state?: "opened"|"closed"}): any;

        public show(projectId: string, issueId: number): any;
    }
}
