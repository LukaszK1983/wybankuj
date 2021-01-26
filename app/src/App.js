import React, {Component} from 'react';
import {Switch, BrowserRouter as Router} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Routes from "./Routes";

export class App extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Routes/>
                </Switch>
            </Router>
        );
    }
}