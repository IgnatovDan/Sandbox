import React from 'react';
import { TasksProvider, TaskStates } from '../lib/store';
import InboxScreen from './inboxScreen';

const tasks = [
    { id: 'task1', title: 'title 1', state: TaskStates.inbox },
    { id: 'task 2', title: 'title  2', state: TaskStates.inbox },
    { id: 'task3', title: 'title 3', state: TaskStates.inbox },
    { id: 'task 4', title: 'title  4', state: TaskStates.inbox },
];

export default {
    component: InboxScreen,
    title: 'InboxScreen',
};

const Template = (args) => <InboxScreen { ...args } />;

export const Default = Template.bind({});
Default.args = {
    error: null,
    tasksProvider: new TasksProvider(tasks)
};

const tasksProvider = new TasksProvider();
setTimeout(
    () => {
        fetch('https://jsonplaceholder.typicode.com/todos?userId=1')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error, status: ${response.status}`);
                }
                return response.json();
            })
            .then(json => {
                tasksProvider.tasks = json;
                tasksProvider.raiseTasksChanged();
            })
            .catch(error => {
                console.log(`Exception occurs: ${error.message}`);
            });
    },
    1000
);

export const LoadFromRemote = Template.bind({});
LoadFromRemote.args = {
    tasksProvider: tasksProvider,
};
