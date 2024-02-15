export default interface IConfig {
    server: IConfigServer;
    soap: IConfigSoap;
}

export interface IConfigServer {
    port: number;
}

export interface IConfigSoap {
    address: string;
    port: number;
    username: string;
    password: string;
}