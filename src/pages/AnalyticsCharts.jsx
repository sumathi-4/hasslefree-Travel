import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area
} from "recharts";

function AnalyticsCharts({ allApplications = [] }) {
  // 1. Calculate status data dynamically
  const approvedCount = allApplications.filter(a => a.status === "Approved").length;
  const pendingCount = allApplications.filter(a => a.status === "Pending").length;
  const reviewCount = allApplications.filter(a => a.status === "Under Review").length;
  const docReceivedCount = allApplications.filter(a => a.status === "Documents Received").length;
  const rejectedCount = allApplications.filter(a => a.status === "Rejected").length;

  const total = allApplications.length || 1; // avoid division by zero

  const statusData = [
    { name: "Approved", value: approvedCount, percent: ((approvedCount / total) * 100).toFixed(1) },
    { name: "Pending", value: pendingCount, percent: ((pendingCount / total) * 100).toFixed(1) },
    { name: "Under Review", value: reviewCount, percent: ((reviewCount / total) * 100).toFixed(1) },
    { name: "Documents Received", value: docReceivedCount, percent: ((docReceivedCount / total) * 100).toFixed(1) },
    { name: "Rejected", value: rejectedCount, percent: ((rejectedCount / total) * 100).toFixed(1) }
  ];

  const STATUS_COLORS = {
    "Approved": "#22c55e",           // Green
    "Pending": "#eab308",            // Yellow
    "Under Review": "#a855f7",       // Purple
    "Documents Received": "#3b82f6", // Blue
    "Rejected": "#ef4444"            // Red
  };

  // 2. Calculate category data dynamically
  const individualCount = allApplications.filter(a => a.category === "Individuals").length;
  const corporateCount = allApplications.filter(a => a.category === "Corporate").length;
  const agentCount = allApplications.filter(a => a.category === "Agents").length;

  const categoryData = [
    { name: "Individual", count: individualCount, color: "#3b82f6" },
    { name: "Corporate", count: corporateCount, color: "#ef4444" },
    { name: "Agent", count: agentCount, color: "#eab308" }
  ];

  // 3. Monthly application trends (mock values scaled by application volume)
  const monthlyData = [
    { name: "Mar", applications: Math.round(allApplications.length * 1.5) || 5 },
    { name: "Apr", applications: Math.round(allApplications.length * 2.2) || 8 },
    { name: "May", applications: Math.round(allApplications.length * 3.0) || 12 },
    { name: "Jun", applications: Math.round(allApplications.length * 2.5) || 10 },
    { name: "Jul", applications: Math.round(allApplications.length * 4.1) || 15 },
    { name: "Aug", applications: Math.round(allApplications.length * 3.6) || 14 },
    { name: "Sep", applications: Math.round(allApplications.length * 5.0) || 20 }
  ];

  // Custom tooltips to present a premium look
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-xl animate-fade-in">
          <p className="text-gray-500 font-semibold text-sm">{payload[0].name || data.name}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl font-bold text-gray-900">{payload[0].value}</span>
            {data.percent && (
              <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-lg">
                {data.percent}%
              </span>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  // State to track hover for the pie chart slices
  const [activeIndex, setActiveIndex] = useState(-1);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-10">
      {/* 1. Applications by Status (Donut Chart) */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Applications by Status</h3>
          <p className="text-sm text-gray-400 mt-1">Distribution across visa workflows</p>
        </div>

        <div className="h-[250px] relative flex items-center justify-center mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                innerRadius={65}
                outerRadius={90}
                paddingAngle={4}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(-1)}
                animationBegin={100}
                animationDuration={1000}
                isAnimationActive={true}
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={STATUS_COLORS[entry.name]}
                    style={{
                      filter: activeIndex === index ? "drop-shadow(0px 8px 12px rgba(0,0,0,0.15))" : "none",
                      transform: activeIndex === index ? "scale(1.03)" : "scale(1)",
                      transformOrigin: "center",
                      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                      cursor: "pointer"
                    }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {/* Inner Text for Donut Center */}
          <div className="absolute flex flex-col items-center justify-center pointer-events-none">
            <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Total</span>
            <span className="text-3xl font-black text-gray-900">{allApplications.length}</span>
          </div>
        </div>

        {/* Custom Legend */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 text-xs font-semibold text-gray-600">
          {statusData.map((entry, index) => (
            <div key={entry.name} className="flex items-center justify-between py-1 border-b border-gray-50">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: STATUS_COLORS[entry.name] }}
                />
                <span className="truncate">{entry.name}</span>
              </div>
              <span className="text-gray-900 font-bold ml-1">{entry.percent}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Applications by Category (Bar Chart) */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Applications by Category</h3>
          <p className="text-sm text-gray-400 mt-1">Breakdown by applicant class</p>
        </div>

        <div className="h-[250px] mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData} barSize={40} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: "600" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: "600" }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f9fafb", radius: 12 }} />
              <Bar
                dataKey="count"
                radius={[12, 12, 0, 0]}
                animationBegin={200}
                animationDuration={1200}
                isAnimationActive={true}
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    style={{
                      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                      cursor: "pointer"
                    }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Small stats summary for Category */}
        <div className="flex justify-around items-center pt-4 border-t border-gray-50 mt-4 text-center">
          {categoryData.map(c => (
            <div key={c.name}>
              <span className="text-xs text-gray-400 font-semibold uppercase">{c.name}</span>
              <p className="text-lg font-bold text-gray-900 mt-0.5">{c.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Monthly Applications Overview (Area/Line Chart) */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Monthly Applications Overview</h3>
          <p className="text-sm text-gray-400 mt-1">Application submission volume trends</p>
        </div>

        <div className="h-[250px] mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: "600" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: "600" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="applications"
                stroke="#3b82f6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorApplications)"
                activeDot={{
                  r: 7,
                  strokeWidth: 0,
                  fill: "#3b82f6"
                }}
                animationBegin={300}
                animationDuration={1400}
                isAnimationActive={true}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Small overview tag */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-4 text-xs font-semibold text-gray-500">
          <span>Reporting Period: Mar - Sep 2026</span>
          <span className="text-green-600 bg-green-50 px-2 py-1 rounded-lg">▲ Active Growth</span>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsCharts;