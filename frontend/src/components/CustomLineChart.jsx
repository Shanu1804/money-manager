import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;

        return (
            <div className="bg-white shadow-md rounded-lg p-3 border border-gray-200">
                <p className="text-xs font-semibold text-purple-800 mb-1">
                    {data.month}
                </p>
                <p className="text-sm text-gray-800 font-medium">
                    Total:{" "}
                    <span className="text-purple-600">
            ₹{data.totalAmount?.toLocaleString()}
          </span>
                </p>

                {data.items && data.items.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-gray-100">
                        <p className="text-xs text-gray-500 mb-1">Details:</p>
                        {data.items.map((item, index) => (
                            <p key={index} className="text-xs text-gray-700">
                                {item.categoryName || item.name}:{" "}
                                <span className="font-medium">
                                    ₹{Number(item.amount).toLocaleString()}
                                </span>
                            </p>
                        ))}
                    </div>
                )}
            </div>
        );
    }
    return null;
};

const CustomLineChart = ({ data }) => {
    return (
        <div className="w-full h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#875cf5" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#875cf5" stopOpacity={0.05} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />

                    <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#6b7280" }}
                    />

                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#6b7280" }}
                        tickFormatter={(value) => `₹${value}`}
                    />

                    <Tooltip content={<CustomTooltip />} />

                    <Area
                        type="monotone"
                        dataKey="totalAmount"
                        stroke="#875cf5"
                        strokeWidth={3}
                        fill="url(#incomeGradient)"
                        dot={{ r: 5, fill: "#875cf5", strokeWidth: 2, stroke: "#fff" }}
                        activeDot={{ r: 7, strokeWidth: 0 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomLineChart;