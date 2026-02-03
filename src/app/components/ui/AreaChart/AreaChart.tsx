"use client"
import styles from './AreaChart.module.scss'
import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ToolTipChart } from './ToolTipChart';
import { formatCurrency, formatPercentage } from '../../../../lib/utils/common-utils';
import { CurveType } from 'recharts/types/shape/Curve';
import { HeaderChart } from '../HeaderChart/HeaderChart';
import { useRef } from 'react';


export type AreaChartType = "porcentage" | "number" | "currency" | "decimal";

export interface AreaChartData {
    name: string;
    [key: string]: number | string;
}

export interface AreaChart {
    data: AreaChartData[];
    groups: string[];
}

interface AreaChartProps {
    area: AreaChart;
    type: AreaChartType;
    title: string;
    description: string;
    curveType?: CurveType
}

export const AreaChart = ({ area, type, title, description, curveType }: AreaChartProps) => {
    const refChart = useRef<HTMLDivElement>(null);

    return (
        <div className={styles.container} ref={refChart}>
            <HeaderChart title={title} description={description} refChart={refChart} />
            <ResponsiveContainer >
                <RechartsAreaChart
                    className={styles.areachart}
                    responsive
                    data={area.data}
                    margin={{
                        top: 20,
                        right: 0,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke='var(--lambda-color-gray-600)'
                    />
                    <XAxis
                        dataKey="name"
                        stroke='var(--lambda-color-gray-600)'
                        tick={{ fill: 'var(--foreground-title-color)', dy: 5 }}
                    />
                    <YAxis
                        width="auto"
                        tickFormatter={(value) => convertValue(value, type)}
                        stroke='var(--lambda-color-gray-600)'
                        tick={{ fill: 'var(--foreground-title-color)', dx: -5 }}
                    />
                    <Tooltip content={(props) => (
                        <ToolTipChart {...props} type={type} active animationDuration={250} />
                    )} />
                    {area.groups.map((group, index) => (
                        <Area
                            key={index}
                            animationEasing='ease-in-out'
                            animationDuration={200}
                            isAnimationActive={false}
                            type={curveType}
                            dataKey={group}
                            stroke={colors[index]}
                            strokeWidth={2}
                            fill={colors[index]}
                            fillOpacity={0.3} />
                    ))}
                </RechartsAreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export const colors = [
    "var(--lambda-color-cyan-500)",
    "var(--lambda-color-green-500)",
    "var(--lambda-color-yellow-500)",
    "var(--lambda-color-violet-500)",
    "var(--lambda-color-red-500)",
    "var(--lambda-color-blue-500)",
    "var(--lambda-color-pink-500)",
    "var(--lambda-color-orange-500)",
    "var(--lambda-color-brown-500)",
];


const convertValue = (value: number, type: "porcentage" | "number" | "currency" | "decimal") => {
    switch (type) {
        case "porcentage":
            return formatPercentage(value).toString();
        case "currency":
            return formatCurrency(value).toString();
        case "number":
            return value.toString();
        case "decimal":
            return value.toString();
    }
}