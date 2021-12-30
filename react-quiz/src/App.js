import React from 'react'
import {Route, Switch} from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import Quiz from "./containers/Quiz/Quiz";
import QuizCreator from "./containers/QuizCreator/QuizCreator"
import QuizList from "./containers/QuizList/QuizList"
import Auth from "./containers/Auth/Auth"

class App extends React.Component {
    state = {
        quiz: []
    }


    render() {
        return (
            <Layout>
                <Switch>
                    <Route path="/quiz/:id" component={Quiz}/>
                    <Route path="/quiz-creator" component={QuizCreator}/>
                    <Route path="/auth" component={Auth}/>
                    <Route path="/"  component={QuizList}/>
                </Switch>
            </Layout>

        );
    }
}

export default App;
