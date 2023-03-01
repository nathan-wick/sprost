import {ArrowDown, ArrowUp, Brush, Compass, Link45deg, Pencil, PlusCircle, Signpost, Tag, Trash,
    Window, WindowStack} from "react-bootstrap-icons";
import {Button, ButtonGroup, Col, Row} from "react-bootstrap";
import React, {FC} from "react";
import {App} from "../../../types/App";
import AppCover from "../inputs/app/AppCover";
import AppLogo from "../inputs/app/AppLogo";
import NavigationLinkDestination from "../inputs/navigation/NavigationLinkDestination";
import NavigationLinkName from "../inputs/navigation/NavigationLinkName";
import NavigationLinkType from "../inputs/navigation/NavigationLinkType";
import NewView from "../modals/NewView";
import {User} from "../../../types/User";
import {View} from "../../../types/View";
import deleteElement from "../../../utilities/deleteElement";
import moveElement from "../../../utilities/moveElement";

const AppEditor: FC<{
    user: "undefined" | User,
    app: App | undefined,
    setApp: React.Dispatch<React.SetStateAction<App | undefined>>,
    view: View | undefined,
    setView: React.Dispatch<React.SetStateAction<View | undefined>>,
    displayPreview: boolean,
    appearanceRef: React.MutableRefObject<HTMLHeadingElement | null>,
    viewsRef: React.MutableRefObject<HTMLHeadingElement | null>,
    navigationRef: React.MutableRefObject<HTMLHeadingElement | null>,
    newNavigationLink: () => void
}> = ({user, app, setApp, view, setView, displayPreview, appearanceRef, viewsRef, navigationRef,
    newNavigationLink}) => <>
    {
        !view && !displayPreview && <>
            <h1
                ref={appearanceRef}
                className="mt-4">
                <Brush
                    className="mx-2" />
                Appearance
            </h1>
            <Row
                className="gx-0">
                <Col
                    md={6}
                    sm={12}>
                    <div
                        className="m-4 p-2 shadow rounded">
                        {
                            app &&
                                <AppLogo
                                    editApp={app}
                                    setEditApp={setApp} />
                        }
                    </div>
                </Col>
                <Col
                    md={6}
                    sm={12}>
                    <div
                        className="m-4 p-2 shadow rounded">
                        {
                            app &&
                                <AppCover
                                    editApp={app}
                                    setEditApp={setApp} />
                        }
                    </div>
                </Col>
            </Row>
            <h1
                ref={viewsRef}
                className="mt-4">
                <WindowStack
                    className="mx-2" />
                Views
            </h1>
            <Row
                className="gx-0 m-4">
                <Col>
                    <NewView appRoute={app?.route ?? ""} />
                </Col>
            </Row>
            <Row
                className="gx-0">
                {
                    app?.views.map((appView) => <Col
                        key={`${app.route}-app-view-${appView.route}`}
                        lg={4}
                        md={6}
                        sm={12}>
                        <div
                            className="m-4 p-2 shadow rounded">
                            <h3
                                className="mb-4">
                                <Window
                                    className="mx-2" />
                                {appView.name}
                            </h3>
                            <small>
                                <Tag
                                    className="mx-2" />
                                Name: <b>{appView.name}</b>
                            </small>
                            <br />
                            <small>
                                <Signpost
                                    className="mx-2" />
                                Route: sprost.com/{user === "undefined"
                                    ? "undefined"
                                    : user.route}/{app?.route}/<b>
                                    {appView.route}</b>
                            </small>
                            <Row
                                className="mt-4 gx-0">
                                <Col
                                    sm={12}
                                    className="p-1">
                                    <Button
                                        className="w-100"
                                        variant="primary"
                                        onClick={() => setView(appView)}>
                                        <Pencil
                                            className="mx-2" />
                                        Edit
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>)
                }
            </Row>
            {
                app && app.views.length > 0 && <>
                    <h1
                        ref={navigationRef}
                        className="mt-4">
                        <Compass
                            className="mx-2" />
                        Navigation
                    </h1>
                    <Row
                        className="gx-0 m-4 shadow rounded">
                        <Col>
                            <Button
                                className="w-100"
                                onClick={newNavigationLink}>
                                <PlusCircle
                                    className="mx-2"/>
                                New Link
                            </Button>
                        </Col>
                    </Row>
                    <Row
                        className="gx-0">
                        <Col>
                            <>
                                {
                                    app?.navigation.map((currentNavigation, index) => <div
                                        key={index}
                                        className="m-4 p-2 shadow rounded">
                                        <Row
                                            className="gx-0">
                                            <Col>
                                                <h3>
                                                    <Link45deg
                                                        className="mx-2" />
                                                    {currentNavigation.name}
                                                </h3>
                                            </Col>
                                            <Col
                                                className="text-end">
                                                <ButtonGroup
                                                    className="mx-1">
                                                    {
                                                        index !== 0 &&
                                                            <Button
                                                                variant="outline-primary"
                                                                onClick={() => {

                                                                    const newApp =
                                                                    structuredClone(app);
                                                                    newApp.navigation =
                                                                        moveElement(
                                                                            newApp.
                                                                                navigation,
                                                                            index,
                                                                            "up"
                                                                        );
                                                                    setApp(newApp);

                                                                }}>
                                                                <ArrowUp
                                                                    className="mx-2"/>
                                                            </Button>
                                                    }
                                                    {
                                                        index !==
                                                            (app.navigation.length ??=
                                                                1) - 1 &&
                                                            <Button
                                                                variant="outline-primary"
                                                                onClick={() => {

                                                                    const newApp =
                                                                    structuredClone(app);
                                                                    newApp.navigation =
                                                                        moveElement(
                                                                            newApp.
                                                                                navigation,
                                                                            index,
                                                                            "down"
                                                                        );
                                                                    setApp(newApp);

                                                                }}>
                                                                <ArrowDown
                                                                    className="mx-2"/>
                                                            </Button>
                                                    }
                                                </ButtonGroup>
                                                <Button
                                                    variant="outline-danger"
                                                    className="mx-1"
                                                    onClick={() => {

                                                        const newApp = structuredClone(app);
                                                        newApp.navigation = deleteElement(
                                                            newApp.navigation,
                                                            index
                                                        );
                                                        setApp(newApp);

                                                    }}>
                                                    <Trash
                                                        className="mx-2"/>
                                                </Button>
                                            </Col>
                                        </Row>
                                        <NavigationLinkType
                                            editApp={app}
                                            setEditApp={setApp}
                                            index={index}/>
                                        {
                                            currentNavigation.type === "external" &&
                                                <NavigationLinkName
                                                    editApp={app}
                                                    setEditApp={setApp}
                                                    index={index}/>
                                        }
                                        <NavigationLinkDestination
                                            editApp={app}
                                            setEditApp={setApp}
                                            index={index}/>
                                    </div>)
                                }
                            </>
                        </Col>
                    </Row>
                </>
            }
        </>
    }
</>;

export default AppEditor;
