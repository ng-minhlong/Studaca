"use client";

import React from "react";
import { ChartDataPoint } from "../_lib/types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Props {
  data: ChartDataPoint[];
}

export const PerformanceChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full bg-white border rounded-md p-4 shadow-sm">
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#666" }} />
            <YAxis
              domain={[350, 1650]}
              ticks={[350, 450, 550, 650, 750, 850, 950, 1050, 1150, 1250, 1350, 1450, 1550, 1650]}
              tick={{ fontSize: 10, fill: "#666" }}
              label={{ value: "Band", angle: -90, position: "insideLeft", style: { fontSize: 12, fill: "#888" } }}
            />
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} iconType="square" />
            <Line
              type="monotone"
              dataKey="band"
              name="Band"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4, fill: "#3b82f6" }}
            />
            <Line
              type="monotone"
              dataKey="avgPoint"
              name="Avg Point"
              stroke="#f97316"
              strokeWidth={2}
              dot={{ r: 4, fill: "#f97316" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};