"use client";
import { CartesianGrid, BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './BarChart.module.scss'
import { ChartGroup, ChartNumberType } from '@/typesComponents/chart';
import { ToolTipChart } from '../AreaChart/ToolTipChart';
import { COLORS } from '@/utils/constants';


interface BarChartProps {
    data: ChartGroup;
    title: string;
    description: string;
    type: ChartNumberType;
    barSize?: number;
    showLegend?: boolean;
    showTooltip?: boolean;
    colors?: string[];
    height?: number | `${number}%`;
    width?: number | `${number}%`;
    className?: string;
}

export const BarChart = ({
    data,
    title,
    description,
    type,
    barSize,
    showLegend,
    showTooltip,
    colors,
    height,
    width,
    className
}: BarChartProps) => {
    const currentColors = colors || COLORS;
    return (
        <div className={`${styles.barchart} `}>
            <h2>{title}</h2>
            <span>{description}</span>
            <ResponsiveContainer height={height} width={width} >
                <RechartsBarChart
                    className={`${styles.barchart_chart}  `}
                    responsive
                    data={data.data}
                    margin={{
                        top: 5,
                        right: 0,
                        left: 0,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke='var(--border-color)'
                    />
                    <XAxis
                        dataKey="name"
                        stroke='var(--surface-e)'
                        fontSize={14}
                        tick={{ fill: 'var(--foreground-secondary-color)', dy: 5 }}
                    />
                    <YAxis
                        width="auto"
                        stroke='var(--surface-e)'
                        fontSize={14}
                        tick={{ fill: 'var(--foreground-secondary-color)', dx: -5 }}
                    />
                    {showTooltip && <Tooltip cursor={{ fillOpacity: 0.35, fill: "var(--surface-c)" }} content={(props) => (
                        <ToolTipChart {...props} type={type} active animationDuration={250} />
                    )} />}
                    {showLegend && <Legend />}
                    {data.groups.map((group, index) => (
                        <Bar
                            key={index}
                            dataKey={group}
                            barSize={barSize}
                            fill={currentColors[index]} />
                    ))}

                </RechartsBarChart>
            </ResponsiveContainer>
        </div>
    );
}
