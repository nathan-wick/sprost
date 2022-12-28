import {Component} from "./Component";

export declare interface View {
    isSaved: boolean,
    route: string,
    name: string,
    type: "information",
    components: Component[],
}
