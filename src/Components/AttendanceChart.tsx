"use client";
import Image from "next/image";
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
  { name: "Mon", present: 60, absent: 40 },
  { name: "Tue", present: 70, absent: 60 },
  { name: "Wed", present: 90, absent: 75 },
  { name: "Thu", present: 90, absent: 75 },
  { name: "Fri", present: 65, absent: 55 },
];

const AttendanceChart = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-700">Attendance</h1>
        <Image src="/moreDark.png" alt="More" width={24} height={24} />
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barSize={30}>
          {/* Grid and Axis Styling */}
          <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e5e7eb" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#6b7280", fontSize: 14 }}
            tickLine={false}
          />
          <YAxis
            axisLine={false}
            tick={{ fill: "#6b7280", fontSize: 14 }}
            tickLine={false}
          />

          {/* Tooltip Styling */}
          <Tooltip contentStyle={{ borderRadius: "8px", borderColor: "#e5e7eb" }} />
          <Legend align="right" verticalAlign="top" iconType="circle" />

          {/* Animated Bars with Gradient Colors */}
          <defs>
            <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4ADE80" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#34D399" stopOpacity={0.5} />
            </linearGradient>
            <linearGradient id="colorAbsent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F87171" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#EF4444" stopOpacity={0.5} />
            </linearGradient>
          </defs>

          <Bar
            dataKey="present"
            fill="url(#colorPresent)"
            radius={[12, 12, 0, 0]}
            animationDuration={800}
          />
          <Bar
            dataKey="absent"
            fill="url(#colorAbsent)"
            radius={[12, 12, 0, 0]}
            animationDuration={800}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;
