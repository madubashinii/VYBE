import api from "./api";

// Get plans records
export const getPlans = (range) =>
    api.get(`/plans`, { params: { range } }).then((res) => res.data);

// Add a new plans record
export const createPlan = (payload) =>
    api.post(`/plans`, payload).then((res) => res.data);

