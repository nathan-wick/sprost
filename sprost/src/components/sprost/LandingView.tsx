import {CheckCircleFill, PiggyBankFill, RocketTakeoffFill} from "react-bootstrap-icons";
import {Col, Row} from "react-bootstrap";
import React, {useCallback} from "react";
import type {Engine} from "tsparticles-engine";
import Particles from "react-particles";
import SignIn from "./modals/SignIn";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import colors from "../../styles/custom.scss";
import {loadFull} from "tsparticles";

const LandingView = () => {

    const particlesInit = useCallback(
        async (engine: Engine) => {

            await loadFull(engine);

        },
        []
    );

    return <>
        <div
            className="position-relative">
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={{
                    "background": {
                        "color": {
                            "value": colors.background
                        }
                    },
                    "detectRetina": true,
                    "fpsLimit": 60,
                    "interactivity": {
                        "events": {
                            "onClick": {
                                "enable": true,
                                "mode": "push"
                            },
                            "onHover": {
                                "enable": true,
                                "mode": "repulse"
                            },
                            "resize": true
                        },
                        "modes": {
                            "push": {
                                "quantity": 3
                            },
                            "repulse": {
                                "distance": 200,
                                "duration": 0.4,
                                "easing": "ease-out-quad",
                                "factor": 100,
                                "maxSpeed": 1,
                                "speed": 0.8
                            }
                        }
                    },
                    "particles": {
                        "collisions": {
                            "enable": false
                        },
                        "color": {
                            "value": colors.primary
                        },
                        "links": {
                            "color": colors.primary,
                            "distance": 80,
                            "enable": true,
                            "opacity": 0.8,
                            "width": 1
                        },
                        "move": {
                            "direction": "none",
                            "enable": true,
                            "outModes": {
                                "default": "bounce"
                            },
                            "random": true,
                            "speed": 0.8,
                            "straight": false
                        },
                        "number": {
                            "density": {
                                "area": 400,
                                "enable": true
                            },
                            "value": 40
                        },
                        "opacity": {
                            "value": 0.8
                        },
                        "shape": {
                            "type": "circle"
                        },
                        "size": {
                            "value": {
                                "max": 4,
                                "min": 1
                            }
                        }
                    }
                }} />
            <div
                className="position-absolute vw-100">
                <div
                    className="d-flex align-items-center justify-content-center
                        minimum-height-large p-4">
                    <div
                        className="text-center">
                        <h1>
                            <span
                                className="p-2 rounded"
                                style={{"backgroundColor": colors.background}}>
                                Sprost
                            </span>
                        </h1>
                        <p>
                            <span
                                className="p-2 rounded fst-italic"
                                style={{"backgroundColor": colors.background}}>
                                Bring your app idea to life!
                            </span>
                        </p>
                        <SignIn
                            variant="Get Started"/>
                    </div>
                </div>
                <div
                    className="rounded shadow"
                    style={{"backgroundColor": colors.background}}>
                    <Row
                        className="gx-0">
                        <Col
                            lg={4}
                            md={6}
                            sm={12}
                            className="p-4">
                            <div
                                className="p-4 bg-gradient rounded shadow text-white"
                                style={{"backgroundColor": colors.teal}}>
                                <h1>
                                    <RocketTakeoffFill
                                        className="mx-2" />
                                    Quick
                                </h1>
                                <p>
                                    With pre-built components and a streamlined development
                                    process, you can create websites and applications in record
                                    time. Sprost can save you hours of work and get your project
                                    off the ground in minutes.
                                </p>
                            </div>
                        </Col>
                        <Col
                            lg={4}
                            md={6}
                            sm={12}
                            className="p-4">
                            <div
                                className="p-4 bg-gradient rounded shadow text-white"
                                style={{"backgroundColor": colors.primary}}>
                                <h1>
                                    <CheckCircleFill
                                        className="mx-2" />
                                    Easy
                                </h1>
                                <p>
                                    With an intuitive interface and pre-built components, you
                                    don&apos;t need coding experience to create
                                    professional-looking websites and applications. Whether
                                    you&apos;re a small business owner, entrepreneur, or just
                                    looking to create a personal project, Sprost makes it easy to
                                    get started.
                                </p>
                            </div>
                        </Col>
                        <Col
                            lg={4}
                            md={6}
                            sm={12}
                            className="p-4">
                            <div
                                className="p-4 bg-gradient rounded shadow text-white"
                                style={{"backgroundColor": colors.purple}}>
                                <h1>
                                    <PiggyBankFill
                                        className="mx-2" />
                                    Free
                                </h1>
                                <p>
                                    We believe that everyone should have access to the tools they
                                    need to succeed, regardless of their budget. With Sprost, you
                                    can save money and still create amazing websites and
                                    applications.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    </>;

};

export default LandingView;
