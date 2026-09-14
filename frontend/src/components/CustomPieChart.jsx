import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

const CustomPieChart = ({
                            data,
                            label,
                            totalAmount,
                            colors,
                            showTextAnchor = true,
                        }) => {
    return (
        <div className="w-full">
            <div className="w-full h-[300px] relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="amount"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={105}
                            innerRadius={72}
                            paddingAngle={3}
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={colors[index % colors.length]}
                                />
                            ))}
                        </Pie>

                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const item = payload[0].payload;
                                    const value = item.originalAmount ?? item.amount;

                                    return (
                                        <div className="bg-white shadow-lg rounded-lg px-3 py-2 border border-gray-100">
                                            <p className="text-sm font-medium" style={{ color: payload[0].payload.fill || colors[0] }}>
                                                {item.name} :{" "}
                                                {value < 0
                                                    ? `-₹${Math.abs(value).toLocaleString()}`
                                                    : `₹${value.toLocaleString()}`}
                                            </p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                            position={{ y: 0 }}
                            allowEscapeViewBox={{ x: true, y: true }}
                        />
                    </PieChart>
                </ResponsiveContainer>

                {/* Center Text */}
                {showTextAnchor && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
                        <p className="text-sm text-gray-500 mb-1">{label}</p>
                        <p className="text-xl font-semibold text-gray-800">
                            {totalAmount}
                        </p>
                    </div>
                )}
            </div>
            <div className="flex items-center justify-center gap-6 mt-3">
                {data.map((entry, index) => (
                    <div key={entry.name} className="flex items-center gap-2">
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: colors[index] }}
                        ></div>
                        <span className="text-sm text-gray-600">{entry.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomPieChart;