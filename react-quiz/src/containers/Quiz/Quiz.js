import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {
    state = {
        results: {}, // { [id] : 'success', 'error'}
        isFinished: false,
        activeQuestion: 0,
        answerState: null, //{[id]: 'success' 'error'}
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

    onAnswerClickHandler = answerId => {
        console.log(answerId)
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }
        const results = this.state.results
        const question = this.state.quiz[this.state.activeQuestion]
        if (question.rightAnswerId === answerId) {
            if (!results[answerId]) {
                results[answerId] = 'success'
            }
            this.setState({
                answerState: {[answerId]: 'success'},
                results: results // ключ и значение совпадают поэтому можно не писать results : results
            })
            const timeout = window.setTimeout(() => {
                if (this.quizIsFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)
        } else {
            results[answerId] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results: results
            })
        }
    }

    quizIsFinished() {
        if (this.state.activeQuestion + 1 === this.state.quiz.length) {
            return true
        }
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1> Ответьте на все вопросы </h1>
                    {this.state.isFinished ?
                        <FinishedQuiz
                            results={this.state.results}
                            quiz={this.state.quiz}
                        />
                        :

                        <ActiveQuiz
                            question={this.state.quiz[this.state.activeQuestion].question}
                            answers={this.state.quiz[this.state.activeQuestion].answers}
                            onAnswerClick={this.onAnswerClickHandler}
                            activeQuestion={this.state.activeQuestion + 1}
                            quesionLength={this.state.quiz.length}
                            state={this.state.answerState}
                        />
                    }


                </div>
            </div>
        );
    }
}

export default Quiz
