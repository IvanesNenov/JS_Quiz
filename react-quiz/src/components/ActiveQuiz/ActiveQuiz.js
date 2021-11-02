import React from 'react'
import classes from './ActiveQuiz.module.css'
import AnswersList from "./AnswersList/AnswersList";


const ActiveQuiz = props => {

    return (
        <div className={classes.ActiveQuiz}>
            <p className={classes.Question}>
            <span>
            <strong>{props.activeQuestion}. </strong>
                {props.question}
            </span>
                <small>{props.activeQuestion} из {props.quesionLength}</small>
            </p>
            <AnswersList
            answers = {props.answers}
            onAnswerClick={props.onAnswerClick}
            state = {props.state}
            />
        </div>
    )

}

export default ActiveQuiz