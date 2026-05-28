export const escapeRegExp = (value) => String(value ?? "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const buildWeeklySeries = (counts, days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]) => {
    const series = days.map((day) => ({ day, count: 0 }));
    (counts || []).forEach((item) => {
        const dayIndex = Number(item._id) - 1;
        if (dayIndex >= 0 && dayIndex < series.length) {
            series[dayIndex].count = item.count;
        }
    });
    return series;
};

export const csvCell = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;

export const buildCsv = (header, rows) => [header.join(",")].concat(rows.map((row) => row.map(csvCell).join(","))).join("\n");
