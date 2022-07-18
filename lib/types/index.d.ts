export declare type TCommand = {
    description: string;
    command: string;
    option?: {
        command: string;
        description: string;
    };
    action: Function;
};
export declare type TEnvItem = {
    host: string;
    port: string;
    username: string;
    password: string;
    distPath: string;
    webDir: string;
    script: string;
};
export declare type TEnvConfig = {
    projectName: string;
    env: {
        [key in string]: TEnvItem;
    };
};
