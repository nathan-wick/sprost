import {ArrowDown, ArrowUp, Brush, Compass, Link45deg, PlusCircle,
    Trash} from "react-bootstrap-icons";
import {Button, ButtonGroup, Col, Row} from "react-bootstrap";
import {Firestore, doc, updateDoc} from "firebase/firestore";
import React, {FC, useContext, useEffect, useState} from "react";
import {App} from "../../types/App";
import AppCover from "./inputs/app/AppCover";
import AppLogo from "./inputs/app/AppLogo";
import {DatabaseContext} from "../../contexts/Database";
import {Link} from "../../types/Link";
import NavigationLinkDestination from "./inputs/navigation/NavigationLinkDestination";
import NavigationLinkName from "./inputs/navigation/NavigationLinkName";
import NavigationLinkType from "./inputs/navigation/NavigationLinkType";
import {User} from "../../types/User";
import {UserContext} from "../../contexts/User";
import deleteElement from "../../utilities/deleteElement";
import moveElement from "../../utilities/moveElement";

const AppSettings: FC<{ app: App }> = ({app}) => {

    const database = useContext(DatabaseContext),
        user = useContext(UserContext),
        [
            editApp,
            setEditApp
        ] = useState<App>(app),
        newNavigationLink = () => {

            const newEditApp: App = structuredClone(editApp),
                defaultLink: Link = editApp.views[0]
                    ? {
                        "destination": editApp.views[0].route,
                        "name": editApp.views[0].name,
                        "type": "internal"
                    }
                    : {
                        "destination": "https://example.com/",
                        "name": "New Link",
                        "type": "external"
                    };
            newEditApp.navigation.push(defaultLink);
            setEditApp(newEditApp);

        },
        saveChanges = async () => {

            if (user !== "undefined" && editApp !== app) {

                const userReference = doc(
                        database as Firestore,
                        "users",
                        user.id
                    ),
                    newApps: App[] = structuredClone(user.apps),
                    newApp = newApps.find((currentApp) => currentApp.route === editApp.route);
                if (newApp) {

                    newApp.logo = editApp.logo;
                    newApp.cover = editApp.cover;
                    newApp.navigation = editApp.navigation;
                    const newUser: Partial<User> = {
                        "apps": newApps
                    };
                    await updateDoc(
                        userReference,
                        newUser
                    );

                }

            }

        };

    useEffect(
        () => {

            saveChanges();

        },
        [editApp]
    );

    return <Row
        className="gx-0 justify-content-md-center">
        <Col
            lg={8}
            md={10}
            sm={12}>
            <h1
                className="mt-4">
                <Brush
                    className="mx-2" />
                Appearance
            </h1>
            <Row
                className="gx-0">
                <Col
                    md={6}
                    sm={12}
                    className="">
                    <div
                        className="m-4 p-2 shadow rounded">
                        <AppLogo editApp={editApp} setEditApp={setEditApp} />
                    </div>
                </Col>
                <Col
                    md={6}
                    sm={12}
                    className="">
                    <div
                        className="m-4 p-2 shadow rounded">
                        <AppCover editApp={editApp} setEditApp={setEditApp} />
                    </div>
                </Col>
            </Row>
            <h1
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
                            editApp.navigation.map((currentNavigation, index) => <div
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

                                                            const newEditApp =
                                                                structuredClone(editApp);
                                                            newEditApp.navigation = moveElement(
                                                                newEditApp.navigation,
                                                                index,
                                                                "up"
                                                            );
                                                            setEditApp(newEditApp);

                                                        }}>
                                                        <ArrowUp
                                                            className="mx-2"/>
                                                    </Button>
                                            }
                                            {
                                                index !==
                                                    (editApp.navigation.length ??= 1) - 1 &&
                                                    <Button
                                                        variant="outline-primary"
                                                        onClick={() => {

                                                            const newEditApp =
                                                                structuredClone(editApp);
                                                            newEditApp.navigation = moveElement(
                                                                newEditApp.navigation,
                                                                index,
                                                                "down"
                                                            );
                                                            setEditApp(newEditApp);

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

                                                const newEditApp = structuredClone(editApp);
                                                newEditApp.navigation = deleteElement(
                                                    newEditApp.navigation,
                                                    index
                                                );
                                                setEditApp(newEditApp);

                                            }}>
                                            <Trash
                                                className="mx-2"/>
                                        </Button>
                                    </Col>
                                </Row>
                                <NavigationLinkType
                                    editApp={editApp}
                                    setEditApp={setEditApp}
                                    index={index}/>
                                {
                                    currentNavigation.type === "external" &&
                                        <NavigationLinkName
                                            editApp={editApp}
                                            setEditApp={setEditApp}
                                            index={index}/>
                                }
                                <NavigationLinkDestination
                                    editApp={editApp}
                                    setEditApp={setEditApp}
                                    index={index}/>
                            </div>)
                        }
                    </>
                </Col>
            </Row>
        </Col>
    </Row>;

};

export default AppSettings;
