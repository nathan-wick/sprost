import {ArrowDown, ArrowUp, Compass, Link45deg, PlusCircle, Trash} from "react-bootstrap-icons";
import {Button, ButtonGroup, Col, Row} from "react-bootstrap";
import React, {FC} from "react";
import {App} from "../../../../types/App";
import NavigationLinkDestination from "../../inputs/navigation/NavigationLinkDestination";
import NavigationLinkName from "../../inputs/navigation/NavigationLinkName";
import NavigationLinkType from "../../inputs/navigation/NavigationLinkType";
import deleteElement from "../../../../utilities/deleteElement";
import moveElement from "../../../../utilities/moveElement";

const Navigation: FC<{
    app: App | undefined,
    setApp: React.Dispatch<React.SetStateAction<App | undefined>>,
    navigationRef: React.MutableRefObject<HTMLHeadingElement | null>,
    newNavigationLink: () => void
}> = ({app, setApp, navigationRef, newNavigationLink}) => <>
    <Row
        className="gx-0 mt-4">
        <Col>
            <h1
                ref={navigationRef}>
                <Compass
                    className="mx-4" />
                Navigation
            </h1>
        </Col>
        <Col
            className="text-end">
            <Button
                className="mx-4 bg-gradient text-white shadow"
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
                                    className="mx-1 shadow">
                                    {
                                        index !== 0 &&
                                            <Button
                                                variant="primary"
                                                className="bg-gradient text-white"
                                                onClick={() => {

                                                    const newApp = structuredClone(app);
                                                    newApp.navigation = moveElement(
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
                                        index !== (app.navigation.length ??= 1) - 1 &&
                                            <Button
                                                variant="primary"
                                                className="bg-gradient text-white"
                                                onClick={() => {

                                                    const newApp = structuredClone(app);
                                                    newApp.navigation = moveElement(
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
                                    variant="danger"
                                    className="mx-1 bg-gradient text-white shadow"
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
</>;

export default Navigation;
