import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";


export default function Chart({ title, data }) {
    const chartData = Array.isArray(data) ? data : [];
    const xAxisKey = chartData[0]?.day ? "day" : "week";

    return (
        <div className="bg-[#101a37]/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#2a3d6a]/30">
            <h3 className="text-[#e7eefc] text-xl font-bold mb-4">{title}</h3>
            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a3d6a" opacity={0.3} />
                    <XAxis dataKey={xAxisKey} stroke="#9cb0d7" />
                    <YAxis stroke="#9cb0d7" />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#0f1833",
                            border: "none",
                            borderRadius: "8px",
                            color: "#e7eefc"
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="workouts"
                        stroke="#ff6a00"
                        strokeWidth={3}
                        dot={{ fill: "#ff6a00", r: 5 }}
                        activeDot={{ r: 7 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
