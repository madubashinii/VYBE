const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

function authHeaders() {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getProgress(range) {
    const res = await fetch(`${API_BASE}/api/progress?range=${range}`, { headers: authHeaders() });
    if (!res.ok) throw await res.json();
    return res.json();
}

export async function getStats(range) {
    const res = await fetch(`${API_BASE}/api/progress/stats?range=${range}`, { headers: authHeaders() });
    if (!res.ok) throw await res.json();
    return res.json();
}

export async function getWeekly(range) {
    const res = await fetch(`${API_BASE}/api/progress/weekly?range=${range}`, { headers: authHeaders() });
    if (!res.ok) throw await res.json();
    return res.json();
}

export async function getPRs(range) {
    const res = await fetch(`${API_BASE}/api/progress/pr?range=${range}`, { headers: authHeaders() });
    if (!res.ok) throw await res.json();
    return res.json();
}

export async function addProgress(payload) {
    const res = await fetch(`${API_BASE}/api/progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw await res.json();
    return res.json();
}
