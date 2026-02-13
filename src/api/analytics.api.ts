import { api } from './axios';

export const getAnalytics = async () => {
    const res = await api.get('/analytics/creator');
    return res.data;
};