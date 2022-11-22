import { Color } from "./Color";

export declare interface User {
    id: string,
    name?: string,
    email?: string,
    portrait?: string,
    theme: Color,
}