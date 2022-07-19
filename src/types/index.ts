export type TCommand = {
  description: string;
  command: string;
  options?: Array<{
    command: string;
    description: string;
  }>;
  action: Function;
};

export type TEnvItem = {
  host: string;
  port: string;
  username: string;
  password: string;
  distPath: string;
  webDir: string;
  script: string;
};

export type TEnvConfig = {
  projectName: string;
  env: {
    [key in string]: TEnvItem;
  };
};
