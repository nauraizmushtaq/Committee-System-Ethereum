import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Dashboard from "./Dashboard/Dashboard";


function Routes(){
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/Dashboard" component = {Dashboard}/>
                </Switch>
            </div>
        </Router>
)
}
