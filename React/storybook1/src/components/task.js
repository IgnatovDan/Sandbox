import React from 'react';
// import PropTypes from 'prop-types';


export default function Task({ task: { id, title, state }, onArchiveTask, onPinTask }) {
    return (
        <div className={ `list-item ${state}` }>
            <label className='checkbox'>
                <input type="checkbox" defaultChecked={ state === 'TASK_ARCHIVED' }
                    disabled={ true } name='checked' />
                <span classname='checkbox-custom'
                    onClick={ () => onArchiveTask(id) }
                    id={ `archiveTask=${id}` }
                    aria-label={ `archiveTask=${id}` }
                />
            </label>
            <div className='title'>
                <input type='text' value={ title } readonly={ true } placeholder='input title' />
            </div>
            <div className='actions' onClick={ (event) => event.stopPropagation() }>
                {
                    state !== 'STATE_ARCHIVED' && (
                        // eslint-disable-next-line jsx-a11y/anchor-is-valid
                        <a onClick={ () => onPinTask(id) }>
                            <span className='icon-star' id={ `pinTask-${id}` } aria-label={ `pinTask-${id}` } />
                        </a>
                    )
                }
            </div>
        </div>
    );
};

//
// Warning: Component Task declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?
//
// Task.PropTypes = {
//     task: PropTypes.shape({
//         id: PropTypes.string.isRequired,
//         title: PropTypes.string.isRequired,
//         state: PropTypes.string.isRequired,
//     }),
//     onArchiveTask: PropTypes.func,
//     onPinTask: PropTypes.func,
// };
//
