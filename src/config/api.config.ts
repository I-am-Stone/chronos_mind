export const API_CONFIG = {
    BASE_URL: 'http://localhost:8000',
    ENDPOINTS: {
        LOGIN: '/api/auth/login/',
        REGISTER: '/api/auth/register/',
        POST_GOAL: '/api/goals/',
        GET_GOALS: '/api/goals/get-goals',
        UPDATE_PROGRESS: '/api/goals/progress/{goal_id}/',
        DELETE_GOAL: '/api/goals/delete/{goal_id}/',
        STREAK: '/api/goals/get-goal-profile'
    }
};
