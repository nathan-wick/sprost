import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {BarChart, People} from "react-bootstrap-icons";
import {Col, Row} from "react-bootstrap";
import React, {FC} from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import colors from "../../../styles/custom.scss";

const Dashboard: FC<{
    dashboardRef: React.MutableRefObject<HTMLHeadingElement | null>
}> = ({dashboardRef}) => {

    const testData = [
        {
            "name": "Sunday",
            "users": 40
        },
        {
            "name": "Monday",
            "users": 95
        },
        {
            "name": "Tuesday",
            "users": 80
        },
        {
            "name": "Wednesday",
            "users": 85
        },
        {
            "name": "Thursday",
            "users": 75
        },
        {
            "name": "Friday",
            "users": 90
        },
        {
            "name": "Saturday",
            "users": 65
        }
    ];

    return <>
        <h1
            ref={dashboardRef}
            className="mt-4">
            <BarChart
                className="mx-4" />
            Dashboard
        </h1>
        <Row
            className="gx-0">
            <Col>
                <div
                    className="m-4 p-2 shadow rounded">
                    <p>
                        <People
                            className="mx-2" />
                        Active Users
                    </p>
                    <ResponsiveContainer
                        width="90%"
                        height={300}>
                        <AreaChart
                            data={testData}>
                            <defs>
                                <linearGradient
                                    id="users"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1">
                                    <stop
                                        offset="5%"
                                        stopColor={colors.primary}
                                        stopOpacity={1}/>
                                    <stop
                                        offset="95%"
                                        stopColor={colors.primary}
                                        stopOpacity={0.4}/>
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="name" />
                            <YAxis />
                            <CartesianGrid
                                strokeDasharray="3 3" />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="users"
                                stroke={colors.primary}
                                fillOpacity={1}
                                fill="url(#users)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Col>
        </Row>
    </>;

};

export default Dashboard;
