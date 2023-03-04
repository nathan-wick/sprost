import React, {useCallback} from "react";
import type {Engine} from "tsparticles-engine";
import Particles from "react-particles";
import SignIn from "./modals/SignIn";
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
                            "value": "#f8f9fa"
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
                                "quantity": 4
                            }
                        }
                    },
                    "particles": {
                        "collisions": {
                            "enable": false
                        },
                        "color": {
                            "value": "#2997ff"
                        },
                        "links": {
                            "color": "#2997ff",
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
                className="position-absolute">
                <h1>
                    Sprost
                </h1>
                <p>
                    <i>
                        Welcome to Sprost. The quick, easy, and free web app creation tool.
                    </i>
                </p>
                <SignIn />
            </div>
        </div>
    </>;

};

export default LandingView;
