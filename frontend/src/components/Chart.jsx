import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";


export default function Chart({ title, data }) {
    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-[#c3ceda]/30">
            <h3 className="text-[#0c4160] text-xl font-bold mb-4">{title}</h3>
            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#c3ceda" opacity={0.3} />
                    <XAxis dataKey={data[0]?.day ? "day" : "week"} stroke="#738fa7" />
                    <YAxis stroke="#738fa7" />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#0c4160",
                            border: "none",
                            borderRadius: "8px",
                            color: "#fff"
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="workouts"
                        stroke="#0d659d"
                        strokeWidth={3}
                        dot={{ fill: "#0d659d", r: 5 }}
                        activeDot={{ r: 7 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
