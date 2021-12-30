import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizById,quizAnswerClick,retryQuiz} from "../../store/action/quiz";


class Quiz extends Component {


     componentDidMount() {
         this.props.fetchQuizById(this.props.match.params.id)
    }

    render()
    {

        console.log(this.props)
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1> Ответьте на все вопросы </h1>
                    {this.props.loading || !this.props.quiz?
                        <Loader/> :
                        this.props.isFinished ?
                            <FinishedQuiz
                                results={this.props.results}
                                quiz={this.props.quiz}
                                restartQuiz={this.props.retryQuiz}
                            />
                            :

                            <ActiveQuiz
                                answers={this.props.quiz[this.props.activeQuestion].answers}
                                question={this.props.quiz[this.props.activeQuestion].question}
                                onAnswerClick={this.props.quizAnswerClick} //вопросик
                                activeQuestion={this.props.activeQuestion + 1}
                                quesionLength={this.props.quiz.length}
                                state={this.props.answerState}
                            />
                    }


                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId=> dispatch(quizAnswerClick(answerId)),
        retryQuiz : () => dispatch(retryQuiz)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
