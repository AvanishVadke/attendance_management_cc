"use client"

import React from 'react'
import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts"

// Test data to verify chart rendering
const testData = [
  { date: "Jun 1", present: 3, absent: 0, total: 3 },
  { date: "Jun 2", present: 2, absent: 0, total: 2 },
  { date: "Jun 3", present: 4, absent: 1, total: 5 },
]

function TestChart() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-2xl font-semibold tracking-tight">Test Chart</h3>
        <p className="text-sm text-muted-foreground">Simple test chart with hardcoded data</p>
      </div>

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-6 pb-2">
          <ResponsiveContainer width="100%" height={400}>
            <RechartsBarChart 
              data={testData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis 
                dataKey="date"
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="present" fill="#16a34a" radius={[4, 4, 0, 0]} name="Present" />
              <Bar dataKey="absent" fill="#dc2626" radius={[4, 4, 0, 0]} name="Absent" />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Test Data Display */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-6">
          <h4 className="text-lg font-semibold mb-4">Test Data</h4>
          <pre className="text-sm bg-muted p-4 rounded">
            {JSON.stringify(testData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default TestChart
