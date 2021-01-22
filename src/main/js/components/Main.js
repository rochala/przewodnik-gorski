import { Switch, Route } from 'react-router-dom'
import * as React from "react";
import Badges from "./Badges";
import Sections from "./Sections";
import SectionManagment from "./SectionManagement";

const Main = () => {
    return (
        <main>
            <Switch>
                <Route exact path='/'>
                    <Badges/>
                </Route>
                <Route path='/sections'>
                    <Sections/>
                </Route>
                <Route path='/sections/manage'>
                    <SectionManagment/>
                </Route>
            </Switch>
        </main>
    );
}

export default Main