import React, {FC} from "react";
import {App as AppType} from "../../../../types/App";
import Appearance from "./Appearance";
import Navigation from "./Navigation";
import {View} from "../../../../types/View";
import Views from "./Views";

const App: FC<{
    app: AppType | undefined,
    setApp: React.Dispatch<React.SetStateAction<AppType | undefined>>,
    view: View | undefined,
    setView: React.Dispatch<React.SetStateAction<View | undefined>>,
    displayPreview: boolean,
    appearanceRef: React.MutableRefObject<HTMLHeadingElement | null>,
    viewsRef: React.MutableRefObject<HTMLHeadingElement | null>,
    navigationRef: React.MutableRefObject<HTMLHeadingElement | null>,
    newNavigationLink: () => void
}> = ({app, setApp, view, setView, displayPreview, appearanceRef, viewsRef, navigationRef,
    newNavigationLink}) => <>
    {
        !view && !displayPreview && <>
            <Appearance
                app={app}
                setApp={setApp}
                appearanceRef={appearanceRef} />
            <Views
                app={app}
                setView={setView}
                viewsRef={viewsRef} />
            {
                app && app.views.length > 0 &&
                    <Navigation
                        app={app}
                        setApp={setApp}
                        navigationRef={navigationRef}
                        newNavigationLink={newNavigationLink} />
            }
        </>
    }
</>;

export default App;
