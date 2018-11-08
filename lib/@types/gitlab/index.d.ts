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

        public create(projectId: string, body: any): any;
    }

}
