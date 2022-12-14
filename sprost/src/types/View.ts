import { Component } from "./Component";

export declare interface View {
    version: number,
    route: string,
    name: string,
    type: "information",
    components: Component[],
}