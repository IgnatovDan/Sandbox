import React from 'react';
import { TaskStates } from '../lib/store';
import { TaskBoxStatuses, TaskList } from './taskList';

export default {
    component: TaskList,
    title: 'TaskList',
};

const tasks = [
    { id: 'task1', title: 'title 1', state: TaskStates.inbox },
    { id: 'task 2', title: 'title  2', state: TaskStates.inbox },
    { id: 'task3', title: 'title 3', state: TaskStates.inbox },
    { id: 'task 4', title: 'title  4', state: TaskStates.inbox },
];

const Template = args => <TaskList { ...args } />;

export const Default = Template.bind({});
Default.args = {
    tasks,
};

export const WithPinnedTasks = Template.bind({});
WithPinnedTasks.args = {
    tasks: [tasks[0], { ...tasks[1], state: TaskStates.pinned }],
};

export const Loading = Template.bind({});
Loading.args = {
    tasks: null,
    taskBoxStatus: TaskBoxStatuses.loading,
};

export const Empty = Template.bind({});
Empty.args = {
    tasks: [],
};
