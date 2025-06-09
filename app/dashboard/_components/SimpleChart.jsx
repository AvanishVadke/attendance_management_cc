"use client"

import React from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"

const testData = [
  { date: 'Jun 1', present: 8, absent: 1, total: 9 },
  { date: 'Jun 2', present: 9, absent: 0, total: 9 },
  { date: 'Jun 3', present: 7, absent: 2, total: 9 },
  { date: 'Jun 4', present: 8, absent: 1, total: 9 },
  { date: 'Jun 5', present: 9, absent: 0, total: 9 },
]

function SimpleChart() {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">Simple Test Chart</h3>
      <div className="w-full h-[400px] border rounded-lg p-4 bg-white">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={testData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="present" fill="#22c55e" name="Present" />
            <Bar dataKey="absent" fill="#ef4444" name="Absent" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default SimpleChart
