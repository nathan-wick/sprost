import React, {FC, createContext, useCallback, useMemo, useState} from "react";
import {Toast, ToastContainer} from "react-bootstrap";
import {BellFill} from "react-bootstrap-icons";

export const ToasterContext = createContext<({
    createToast: (
        type: "success" | "danger",
        title: string,
        text: string
    // eslint-disable-next-line no-extra-parens
    ) => void }) | "undefined">("undefined"),
    ToasterContextProvider: FC<{ children: JSX.Element }> = ({children}) => {

        const [
                toasts,
                setToasts
            ] = useState<JSX.Element[]>([]),
            createToast = useCallback(
                (
                    type: "success" | "danger",
                    title: string,
                    text: string
                ) => {

                    const newToast = <Toast
                        key={`toast-${toasts.length}`}
                        className="m-4">
                        <Toast.Header
                            className={`bg-${type} text-white`}
                            closeButton={false}>
                            <b
                                className="me-auto">
                                <BellFill
                                    className="mx-2"/>
                                {title}
                            </b>
                        </Toast.Header>
                        <Toast.Body>
                            {text}
                        </Toast.Body>
                    </Toast>;
                    setToasts((prevToasts) => [
                        ...prevToasts,
                        newToast
                    ]);
                    setTimeout(
                        () => {

                            setToasts([]);

                        },
                        3000
                    );

                },
                [toasts]
            ),
            toaster = useMemo(
                () => ({createToast}),
                [toasts]
            );

        return <>
            <ToastContainer position="top-end">
                {toasts}
            </ToastContainer>
            <ToasterContext.Provider value={toaster}>
                {children}
            </ToasterContext.Provider>
        </>;

    };

export default ToasterContextProvider;
