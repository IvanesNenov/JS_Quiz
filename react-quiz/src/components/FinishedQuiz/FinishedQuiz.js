import React from 'react'
import classes from './FinishedQuiz.module.css'

const FinishedQuiz = props => {
    // console.log(props)
    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {props.quiz.map((quizItem, index) => {
                    const cls = [
                        'fa ',
                        props.results[quizItem.id] === 'error' ? 'fa-times ' : 'fa-check ',
                        classes[props.results[quizItem.id]]
                    ]
                    return (
                        <li
                            key={index}>
                            <strong>{index + 1}</strong>,&nbsp;
                            {quizItem.question}
                            <i className={cls.join(' ')}/>
                        </li>
                    )
                })}
                {/*<li>*/}
                {/*    <strong>1. </strong>*/}
                {/*    How are you?*/}
                {/*    <i className={'fa fa-times '+classes.error}/>*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*    <strong>2. </strong>*/}
                {/*    How are you?*/}
                {/*    <i className={'fa fa-check '+classes.success}/>*/}
                {/*</li>*/}
            </ul>
            <p>Правильно 4 из {props.quiz.length}</p>
            <div>
                <button>Повторить</button>
            </div>

        </div>
    )
}


export default FinishedQuiz