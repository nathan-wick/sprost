import {Component} from "./Component";

export declare interface View {
    route: string,
    name: string,
    type: "page" | "article",
    description: string,
    icon: string,
    cover: string,
    components: Component[],
}
