import {Component} from "./Component";

export declare interface View {
    isSaved: boolean,
    route: string,
    name: string,
    type: "page" | "blog" | "modal",
    components: Component[],
}
