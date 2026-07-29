'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useResult } from '../../engine/result';

export function AccuracyChart() {
  const { getSummary } = useResult();
  const summary = getSummary();

  const data = [
    {
      name: 'Correct',
      value: summary.correct,
      color: '#22c55e',
    },
    {
      name: 'Wrong',
      value: summary.wrong,
      color: '#ef4444',
    },
    {
      name: 'Skipped',
      value: summary.skipped,
      color: '#eab308',
    },
  ].filter(d => d.value > 0);

  return (
    <div className="bg-muted rounded-lg p-6 border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-6">Answer Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [value, '']}
            contentStyle={{
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px',
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
