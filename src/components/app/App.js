import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage } from "../pages/index";
const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <Switch>
                    <Route exact path="/">
                        <MainPage />
                    </Route>
                    <Route exact path="/comics">
                        <ComicsPage />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;
