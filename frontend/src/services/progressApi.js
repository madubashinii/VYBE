// frontend/services/progressApi.js
import api from "./api";

// Get progress records
export const getProgress = (range) =>
    api.get(`/progress`, { params: { range } }).then((res) => res.data);

// Get summary stats
export const getStats = (range) =>
    api.get(`/progress/stats`, { params: { range } }).then((res) => res.data);

// Get weekly aggregated counts
export const getWeekly = (range) =>
    api.get(`/progress/weekly`, { params: { range } }).then((res) => res.data);

// Get personal records
export const getPRs = (range) =>
    api.get(`/progress/pr`, { params: { range } }).then((res) => res.data);

// Add a new progress record
export const addProgress = (payload) =>
    api.post(`/progress`, payload).then((res) => res.data);

// Delete a progress record
export const deleteProgress = (id) =>
    api.delete(`/progress/${id}`).then((res) => res.data);
