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
  CartesianGrid
} from "recharts";

function AnalyticsCharts() {

  const visaStatusData = [

    {
      name:"Approved",
      value:860
    },

    {
      name:"Pending",
      value:240
    },

    {
      name:"Rejected",
      value:90
    },

    {
      name:"Processing",
      value:320
    }
  ];

  const monthlyApplications = [

    {
      month:"Jan",
      applications:120
    },

    {
      month:"Feb",
      applications:220
    },

    {
      month:"Mar",
      applications:280
    },

    {
      month:"Apr",
      applications:350
    },

    {
      month:"May",
      applications:420
    },

    {
      month:"Jun",
      applications:500
    }
  ];

  const COLORS = [

    "#22c55e",
    "#eab308",
    "#ef4444",
    "#3b82f6"
  ];

  return (

    <div className="grid lg:grid-cols-2 gap-8 mt-16">

      {/* PIE */}

      <div className="bg-white/5 border border-white/10 rounded-[35px] p-8">

        <h2 className="text-3xl font-bold text-white mb-10">

          Visa Status Analytics

        </h2>

        <div className="h-[350px]">

          <ResponsiveContainer width="100%" height="100%">

            <PieChart>

              <Pie

                data={visaStatusData}

                dataKey="value"

                outerRadius={120}

                label
              >

                {
                  visaStatusData.map((entry,index)=>(

                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))
                }

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* BAR */}

      <div className="bg-white/5 border border-white/10 rounded-[35px] p-8">

        <h2 className="text-3xl font-bold text-white mb-10">

          Monthly Applications

        </h2>

        <div className="h-[350px]">

          <ResponsiveContainer width="100%" height="100%">

            <BarChart data={monthlyApplications}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#374151"
              />

              <XAxis
                dataKey="month"
                stroke="#9ca3af"
              />

              <YAxis stroke="#9ca3af" />

              <Tooltip />

              <Bar
                dataKey="applications"
                fill="#3b82f6"
                radius={[10,10,0,0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}

export default AnalyticsCharts;