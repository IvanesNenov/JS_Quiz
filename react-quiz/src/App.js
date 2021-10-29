import React from 'react'
import Layout from "./hoc/Layout/layout";
import Quiz from "./containers/Quiz/Quiz";

class App extends React.Component {
    state = {
        quiz: []
    }
    


    render() {
        return (
            <Layout>

                <Quiz/>

            </Layout>

        );
    }
}

export default App;
