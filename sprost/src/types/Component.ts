import {Header} from "./components/Header";
import {Paragraph} from "./components/Paragraph";
import {Title} from "./components/Title";

export declare interface Component {
    id: string,
    type: Header | Title | Paragraph,
}
