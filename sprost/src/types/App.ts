import {View} from "./View";

export declare interface App {
    route: string,
    name: string,
    description: string,
    logo: string,
    cover: string,
    version: {
        major: number,
        minor: number,
        patch: number,
    },
    views: View[],
}
