import api from "./api";

// Get plans records
export const getPlans = (range) =>
    api.get(`/plans`, { params: { range } }).then((res) => res.data);

// Add a new plans record
export const createPlan = (payload) =>
    api.post(`/plans`, payload).then((res) => res.data);

export const updatePlan = (planId, payload) =>
    api.put(`/plans/${planId}`, payload).then((res) => res.data);

export const deletePlan = (planId) =>
    api.delete(`/plans/${planId}`).then((res) => res.data);

