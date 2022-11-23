import { Color } from "./Color";

export declare interface User {
    id: string,
    theme: Color,
    name?: string,
    email?: string,
    portrait?: string,
    apps?: [{
        id: string,
        name: string,
        version: string,
        navigation: {
            views?: [string],
        },
        views?: [{
            id: string,
            name: string,
            components?: [{
                type: "heading" | "paragraph",
            }],
        }],
    }],
}