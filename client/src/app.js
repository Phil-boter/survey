import ReactDOM from "react-dom";
import { Component } from "react";
import { Route, BrowserRouter, Link } from "react-router-dom";
import Create from "./create";
import Survey from "./survey";
import Results from "./results";
import ThankYou from "./thankyou";
import Participate from "./participate";

export default function App() {
    return (
        <BrowserRouter>
            <Route exact path="/" render={() => <Survey />} />
            <Route path="/create" render={() => <Create />} />
            <Route
                path="/results/:id"
                render={(props) => {
                    return <Results surveyId={props.match.params.id} />;
                }}
            />
            <Route path="/participate" render={() => <Participate />} />
            <Route path="/thankyou" render={() => <ThankYou />} />
        </BrowserRouter>
    );
}
