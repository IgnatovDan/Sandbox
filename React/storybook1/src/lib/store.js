import { configureStore, createSlice } from '@reduxjs/toolkit';

export const TaskStates = {
    inbox: 'TASK_INBOX',
    pinned: 'TASK_PINNED',
    archived: 'TASK_ARCHIVED',
};

const defaultTasks = [
    { id: 'task1', title: 'title 1', state: TaskStates.inbox },
    { id: 'task 2', title: 'title  2', state: TaskStates.inbox },
    { id: 'task3', title: 'title 3', state: TaskStates.inbox },
    { id: 'task 4', title: 'title  4', state: TaskStates.inbox },
];

const TaskBoxData = {
    tasks: defaultTasks,
    status: 'idle',
    error: null,
};

const TaskSlice = createSlice({
    name: 'taskbox',
    initialState: TaskBoxData,
    reducers: {
        updateTaskState: (state, action) => {
            const { id, newTaskState } = action.payload;
            const taskIndex = state.tasks.findIndex(task => task.id === id);
            if (taskIndex >= 0) {
                state.tasks[taskIndex] = newTaskState;
            }
        },
    },
});

const store = configureStore({
    reducer: {
        taskbox: TaskSlice.reducer,
    },
});

export default store;
export const { updateTaskState } = TaskSlice.actions;
