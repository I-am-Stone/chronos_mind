export interface backendGoal {
    id: number;
    goal_title: string;
    description: string;
    target_date: string;
    difficulty: string;
    progress_bar: number;
    goal_type: string;
    subtasks: []; //list of SubtaskObject
  }