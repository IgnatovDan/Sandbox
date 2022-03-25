import React, { useEffect, useState } from 'react';
import { manualUpdateTaskState, TaskStates } from '../lib/store';
import { TaskList } from './taskList';

export default function InboxScreen({ error, tasksProvider }) {
    const [tasks, setTasks] = useState(tasksProvider?.tasks);

    useEffect(() => {
        const onTasksChanged = (newTasks) => setTasks(newTasks);
        tasksProvider?.addTasksChangedListener?.(onTasksChanged);
        return () => {
            tasksProvider?.removeTasksChangedListener?.(onTasksChanged);
        }
    });

    if (error) {
        return (
            <div className='page lists-show'>
                <div className='wrapper-message'>
                    <span className='icon-face-sad' />
                    <div className='title-message'>Oh no!</div>
                    <div className='subtitle-message'>Something went wrong</div>
                </div>
            </div>
        );
    }

    return (
        <div className='page lists-show'>
            <nav>
                <h1 className='title-page'>
                    <span className='title-wrapper'>TasksBox</span>
                </h1>
            </nav>
            <TaskList
                tasks={ tasks }
                pinTask={ (taskId) => setTasks(manualUpdateTaskState(tasks, taskId, TaskStates.pinned)) }
                archiveTask={ (taskId) => setTasks(manualUpdateTaskState(tasks, taskId, TaskStates.archived)) }
            />
        </div>
    );
}
