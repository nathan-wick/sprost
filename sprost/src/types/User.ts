import {App} from "./App";

export declare interface User {
    id: string,
    theme: "light" | "dark",
    route: string,
    apps: App[],

    name?: string,
    email?: string,
    portrait?: string,
}
