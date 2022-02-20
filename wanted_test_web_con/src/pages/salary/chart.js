import React, { PureComponent } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const data = [
    {
        name: "신입",
        uv: 3000,
        pv: 2500,
        amt: 0,
    },
    {
        name: "1년",
        uv: 3500,
        pv: 4000,
        amt: 2210,
    },
    {
        name: "2년",
        uv: 2000,
        pv: 4300,
        amt: 2290,
    },
    {
        name: "3년",
        uv: 2780,
        pv: 4500,
        amt: 2000,
    },
    {
        name: "4년",
        uv: 1890,
        pv: 5000,
        amt: 2181,
    },
    {
        name: "5년",
        uv: 2390,
        pv: 6000,
        amt: 2500,
    },
    {
        name: "6년",
        uv: 3490,
        pv: 7000,
        amt: 2100,
    },
];

const Chart = () => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                barSize={20}
            >
                <XAxis
                    dataKey="name"
                    scale="point"
                    padding={{ left: 10, right: 10 }}
                />
                <YAxis />
                <Tooltip />
                {/* <Legend /> */}
                <CartesianGrid strokeDasharray="3 3" />
                <Bar
                    dataKey="pv"
                    fill="whitesmoke"
                    background={{ fill: "rgba(0,0,0,0.1)" }}
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default Chart;
