import {App} from "./App";
import {Color} from "./Color";

export declare interface User {
    id: string,
    theme: Color,
    route: string,
    apps: App[],

    name?: string,
    email?: string,
    portrait?: string,
}
