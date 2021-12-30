import axios from '../../axios/axios-quiz';
import {
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS, FINISH_QUIZ, QUIZ_NEXT_QUESTION,
    QUIZ_SET_STATE, RETRY_QUIZ
} from "./actionType";


export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get('quizes.json')
            const quizes = []
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест №${index + 1}`

                })
            })
            dispatch(fetchQuizesSuccess(quizes))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }

    }

}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export function fetchQuizesError(e) {
    return {
        type: FETCH_QUIZES_ERROR,
        error: e
    }
}

export function fetchQuizById(quizId) {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get(`quizes/${quizId}.json`)
            const quiz = response.data

            dispatch(fetchQuizSuccess(quiz))

        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState,
        results
    }
}

export function finishQuiz() {
    return {
        type: FINISH_QUIZ,

    }
}

export function quizNextQuestion(activeQuestion) {
    return {
        type: QUIZ_NEXT_QUESTION,
        activeQuestion

    }
}

export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz //получили доступ к полю quiz внутри action

        if (state.answerState) {
            const key = Object.keys(state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }
        const results = state.results
        const question = state.quiz[state.activeQuestion]

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            dispatch(quizSetState({[answerId]: 'success'}, results))

            const timeout = window.setTimeout(() => {
                if (quizIsFinished(state)) {

                    dispatch(finishQuiz())

                } else {

                    dispatch(quizNextQuestion(state.activeQuestion + 1))

                }
                window.clearTimeout(timeout)
            }, 500)
        } else {
            results[question.id] = 'error'
            dispatch(quizSetState({[answerId]: 'error'}, results))

        }
    }

}

export function retryQuiz() {
    return {
        type: RETRY_QUIZ
    }

}

function quizIsFinished(state) {
    return state.activeQuestion + 1 === state.quiz.length
    // {
    //         return true
    //
    // }

}