import React from 'react';
import { TaskList } from './taskList';

export default function InboxScreen({ error, tasks }) {
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
            <TaskList />
        </div>
    );
}
