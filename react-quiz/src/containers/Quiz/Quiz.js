import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";

class Quiz extends Component {
    state = {
        activeQuestion: 0,
        quiz: [
            {
                id: 0,
                question: 'Какого цвета небо?',
                rightAnswerId: 2,
                answers: [
                    {text: 'Черное', id: 1},
                    {text: 'Синее', id: 2},
                    {text: 'Красное', id: 3},
                    {text: 'Зеленое', id: 4},
                ]
            },
            {
                id: 1,
                question: 'В каком году основали Санкт-Петербург?',
                rightAnswerId: 3,
                answers: [
                    {text: '1700', id: 1},
                    {text: '1701', id: 2},
                    {text: '1703', id: 3},
                    {text: '1705', id: 4},
                ]
            }
        ]
    }

    onAnswerClickHandler = (id) => {
        console.log(id)
        this.setState({
            activeQuestion: this.state.activeQuestion + 1
        })

    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1> Ответьте на все вопросы </h1>
                    <ActiveQuiz
                        question={this.state.quiz[this.state.activeQuestion].question}
                        answers={this.state.quiz[this.state.activeQuestion].answers}
                        onAnswerClick={this.onAnswerClickHandler}
                        activeQuestion={this.state.activeQuestion+1}
                        quesionLength = {this.state.quiz.length}
                    />
                </div>
            </div>
        );
    }
}

export default Quiz
