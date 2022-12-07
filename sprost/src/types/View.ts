import { Component } from "./Component";

export declare interface View {
    route: string,
    name: string,
    type: "information",
    components: Component[],
}