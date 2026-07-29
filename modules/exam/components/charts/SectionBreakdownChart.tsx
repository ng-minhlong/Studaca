'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useResult } from '../../engine/result';

export function SectionBreakdownChart() {
  const { getStatistics } = useResult();
  const statistics = getStatistics();

  const data = statistics.sectionBreakdown.map(section => ({
    name: section.sectionTitle,
    correct: section.correct,
    wrong: section.wrong,
    skipped: section.skipped,
  }));

  return (
    <div className="bg-muted rounded-lg p-6 border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-6">Performance by Section</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="name"
            tick={{ fill: 'hsl(var(--foreground))' }}
            fontSize={12}
          />
          <YAxis tick={{ fill: 'hsl(var(--foreground))' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px',
            }}
          />
          <Legend />
          <Bar dataKey="correct" stackId="a" fill="#22c55e" name="Correct" />
          <Bar dataKey="wrong" stackId="a" fill="#ef4444" name="Wrong" />
          <Bar dataKey="skipped" stackId="a" fill="#eab308" name="Skipped" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
