export const API_CONFIG = {
    BASE_URL: 'http://localhost:8000',
    ENDPOINTS: {
        LOGIN: '/api/auth/login/',
        REGISTER: '/api/auth/register/',

        //Goals
        POST_GOAL: '/api/goals/',
        GET_GOALS: '/api/goals/goals/with-subtasks/',
        UPDATE_PROGRESS: '/api/goals/progress/{goal_id}/',
        DELETE_GOAL: '/api/goals/goal/{goal_id}/',
        GOAL_STATS: '/api/goals/goal-stats',
        GOAL_PROFILE:'/api/goals/get-goal-profile',
        UPDATE_GOAL: '/api/goals/update/{goal_id}/',
        SUB_TASK: '/api/goals/subtasks/create/',
        SUB_TASK_LIST: '/api/goals/subtasks/',
        DELETE_SUB_TASK: '/api/goals/subtasks/{id}/delete/',
        COMPLETE_SUB_TASK: '/api/goals/subtasks/{id}/toggle-complete/',

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
        AI_SESSION_ALL:'/api/introspection/past-ai-analysis',
        INTROSPECTIONS_PROFILE:'/api/introspection/past-ai-analysis',
        GRAPH_DATA: '/api/introspection/graph',

        //user Profile
        GET_PROFILE:'/api/user-profile/get-profile/',
        GET_ACTIVITY:'/api/user-profile/get-activity/',

        //Shop
        GET_SHOP_ITEMS:'/api/shop/get-shop-items-and-points',
        ORDER_ITEM:'/api/shop/order/',
        ALL_ORDERED_ITEMS:'/api/shop/get-order',
    }
};
