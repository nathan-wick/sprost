import React, {FC} from "react";
import Email from "../inputs/settings/Email";
import {Gear} from "react-bootstrap-icons";
import Name from "../inputs/settings/Name";
import Portrait from "../inputs/settings/Portrait";
import Theme from "../inputs/settings/Theme";

const Settings: FC<{
    settingsRef: React.MutableRefObject<HTMLHeadingElement | null>
}> = ({settingsRef}) => <>
    <h1
        ref={settingsRef}
        className="mt-4">
        <Gear
            className="mx-2" />
        Settings
    </h1>
    <div
        className="m-4 p-2 shadow rounded">
        <Portrait />
        <Name />
        <Email />
        <Theme />
    </div>
</>;

export default Settings;
