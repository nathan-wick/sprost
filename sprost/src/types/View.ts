import {Component} from "./Component";

export declare interface View {
    isSaved: boolean,
    route: string,
    name: string,
    type: "page" | "post" | "modal",
    description: string,
    icon: string,
    cover: string,
    components: Component[],
}
