export const API_CONFIG = {
    BASE_URL: 'http://localhost:8000',
    ENDPOINTS: {
        LOGIN: '/api/auth/login/',
        REGISTER: '/api/auth/register/',

        //Goals
        POST_GOAL: '/api/goals/',
        GET_GOALS: '/api/goals/get-goals',
        UPDATE_PROGRESS: '/api/goals/progress/{goal_id}/',
        DELETE_GOAL: '/api/goals/delete/{goal_id}/',
        GOAL_STATS: '/api/goals/goal-stats',
        GOAL_PROFILE:'/api/goals/get-goal-profile',
        UPDATE_GOAL: '/api/goals/update/{goal_id}/',

        //habits
        POST_HABITS: '/api/habits/',
        GET_HABITS: '/api/habits/get-habits/',
        DELETE_HABIT: '/api/habits/delete/{id}/',
        UPDATE_HABIT: '/api/habits/update/{id}/',
        UPDATE_COMPLETE:'/api/habits/update-completion/{id}/',
        HABIT_PROFILE:'/api/habits/get-habit-profile',

        //introspection
        POST_SESSION: '/api/introspection/',
        GET_SESSION: '/api/introspection/session',
        AI_SESSION:'/api/introspection/ai-session',
    }
};
