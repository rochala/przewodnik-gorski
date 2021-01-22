import { Switch, Route } from 'react-router-dom'
import * as React from "react";
import Badges from "./Badges";
import Sections from "./Sections";
import SectionManagement from "./SectionManagement";

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
                <Route path='/manage/sections'>
                    <SectionManagement/>
                </Route>
            </Switch>
        </main>
    );
}

export default Main