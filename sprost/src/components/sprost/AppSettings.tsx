import {Button, Col, Row} from "react-bootstrap";
import {Firestore, doc, updateDoc} from "firebase/firestore";
import React, {FC, useContext, useEffect, useState} from "react";
import {App} from "../../types/App";
import AppCover from "./inputs/app/AppCover";
import AppLogo from "./inputs/app/AppLogo";
import {DatabaseContext} from "../../contexts/Database";
import Header from "../shared/Header";
import {Link} from "../../types/Link";
import NavigationHeaderBackground from "../../assets/images/compass.jpeg";
import {PlusCircle} from "react-bootstrap-icons";
import SettingsHeaderBackground from "../../assets/images/controller.jpeg";
import {User} from "../../types/User";
import {UserContext} from "../../contexts/User";

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
            <Header
                component={{
                    "alignment": "left",
                    "background": "image",
                    "id": "header",
                    "image": SettingsHeaderBackground,
                    "message": "Settings",
                    "size": "small"
                }}/>
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
            <Header
                component={{
                    "alignment": "left",
                    "background": "image",
                    "id": "header",
                    "image": NavigationHeaderBackground,
                    "message": "Navigation",
                    "size": "small"
                }}/>
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
                className="gx-0 m-4 p-2 shadow rounded">
                <Col
                    className="p-2">
                    <>
                        {
                            editApp.navigation.map((currentNavigation, index) => <p
                                key={index}>
                                {currentNavigation.name}
                            </p>)
                        }
                    </>
                </Col>
            </Row>
        </Col>
    </Row>;

};

export default AppSettings;
