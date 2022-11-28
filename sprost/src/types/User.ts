import { App } from "./App";
import { Color } from "./Color";

export declare interface User {
    id: string,
    theme: Color,
    name?: string,
    email?: string,
    portrait?: string,
    apps?: App[],
}