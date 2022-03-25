import React from 'react';
import { connect } from 'react-redux';
import { updateTaskState, TaskStates } from '../lib/store';

import Task from './task';

export const TaskBoxStatuses = {
    loading: 'loading',
    ready: 'ready',
};

//
// Pure UI component, no refs to Redux
//
export function TaskList({ tasks, taskBoxStatus, pinTask, archiveTask }) {
    const loadingRow = (
        <div className='loading-item'>
            <span className='glow-checkbox' />
            <span className='glow-text'>
                <span>Loading</span> <span>cool</span> <span>state</span>
            </span>
        </div>
    );

    if (taskBoxStatus === 'loading') {
        return (
            <div className='list-items' data-testingid='loading' key={ 'loading' }>
                { loadingRow }
                { loadingRow }
                { loadingRow }
            </div>
        );
    } else if (!tasks || tasks.length === 0) {
        return (
            <div className='list-items' key={ 'empty' } data-testingid='empty'>
                <div className='wrapper-message'>
                    <span className='icon-check' />
                    <div className='title-message'>You have no tasks</div>
                    <div className='subtitle-message'>Sit back and relax</div>
                </div>
            </div>
        );
    } else {
        return (
            <div className='listItems' data-testid='success' key={ 'success' }>
                {
                    tasks.map(task => {
                        return (
                            <Task
                                key={ task.id }
                                task={ task }
                                onPinTask={ taskId => pinTask(taskId) }
                                onArchiveTask={ taskId => archiveTask(taskId) }
                            />
                        );
                    })
                }
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        tasks: null /* TODO: useSelector(state => {
            return [
                ...state.tasks.filter(task => (task.state === TaskStates.inbox || task.state === TaskStates.pinned))
            ]
        })*/,
        taskBoxStatus: null /* TODO useSelector(state => state.taskbox)*/,
    };
};

const mapDispatchToProps = (dispatch) => ({
    pinTask: (taskId) => dispatch(updateTaskState({ id: taskId, newTaskState: TaskStates.pinned })),
    archiveTask: (taskId) => dispatch(updateTaskState({ id: taskId, newTaskState: TaskStates.archived })),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);


/*

original version with embedded redux code

export default function TaskList() {
    const tasks = useSelector(state => {
        return [
            ...state.tasks.filter(task => (task.state === TaskStates.inbox || task.state === TaskStates.pinned))
        ]
    });

    const { status } = useSelector(state => state.taskbox);

    const dispatch = useDispatch();

    const pinTask = (taskId) => {
        dispatch(updateTaskState({ id: taskId, newTaskState: TaskStates.pinned }));
    };

    const archiveTask = (taskId) => {
        dispatch(updateTaskState({ id: taskId, newTaskState: TaskStates.archived }));
    };

    const loadingRow = (
        <div className='loading-item'>
            <span className='glow-checkbox' />
            <span className='glow-text'>
                <span>Loading</span> <span>cool</span> <span>state</span>
            </span>
        </div>
    );

    if (status === 'loading') {
        return (
            <div className='list-items' data-testingid='loading' key={ 'loading' }>
                { loadingRow }
                { loadingRow }
                { loadingRow }
            </div>
        );
    }

    if (tasks.length === 0) {
        return (
            <div className='list-items' key={ 'empty' } data-testingid='empty'>
                <div className='wrapper-message'>
                    <span className='icon-check' />
                    <div className='title-message'>You have no tasks</div>
                    <div className='subtitle-message'>Sit back and relax</div>
                </div>
            </div>
        );
    }

    return (
        <div className='listItems' data-testid='success' key={ 'success' }>
            {
                tasks.map(task => {
                    return (
                        <Task
                            key={ task.id }
                            task={ task }
                            onPinTask={ taskId => pinTask(taskId) }
                            onArchiveTask={ taskId => archiveTask(taskId) }
                        />
                    );
                })
            }
        </div>
    );
};

*/
