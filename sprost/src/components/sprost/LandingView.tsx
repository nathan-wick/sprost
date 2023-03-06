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
                                "mode": "grab"
                            },
                            "resize": true
                        },
                        "modes": {
                            "grab": {
                                "distance": 140,
                                "links": {
                                    "blink": false,
                                    "consent": false,
                                    "opacity": 0.8
                                }
                            },
                            "push": {
                                "quantity": 3
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
                            "distance": 140,
                            "enable": true,
                            "opacity": 0.4,
                            "width": 1
                        },
                        "move": {
                            "direction": "none",
                            "enable": true,
                            "outModes": {
                                "default": "bounce"
                            },
                            "random": false,
                            "speed": 1,
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
                            "value": 0.4
                        },
                        "shape": {
                            "type": "circle"
                        },
                        "size": {
                            "value": {
                                "max": 2,
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
                                Welcome to Sprost. The ultimate web app creation tool.
                            </span>
                        </p>
                        <SignIn />
                    </div>
                </div>
            </div>
        </div>
    </>;

};

export default LandingView;
