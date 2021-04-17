import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import GeneratorMountPage from "./GeneratorMountPage";
import GeneratorMountPage5 from "./GeneratorMountPage5";
import GeneratorMountState from "./GeneratorMountState";
import GeneratorUpdate from "./GeneratorUpdate";
import GeneratorMountWormUp from "./GeneratorMountWormUp";
import VisualizeMountPage from "./VisualizeMountPage";
import VisualizeMountState from "./VisualizeMountState";
import VisualizeMountPage5 from "./VisualizeMountPage5";
import VisualizeUpdate from "./VisualizeUpdate";
import VisualizeUpdateReal from "./VisualizeUpdateReal";
import VisualizeWormUp from "./VisualizeWormUp";
import VisualizeUpdateReal2 from "./VisualizeUpdateReal2";
import Test from "./Test";

import './routes.css';

const Routes = () => {
    return (
        <Router>
            <nav className="menu">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link to="/visualizeWormUp">Visualize Worm Up</Link>
                    </li>
                    <li>
                        <Link to="/visualizeMountPage">Visualize Mount Page Reload</Link>
                    </li>
                    <li>
                        <Link to="/visualizeUpdate">Visualize Update</Link>
                    </li>
                    <li>
                        <Link to="/visualizeUpdateReal">Visualize Update Real</Link>
                    </li>
                    <li>
                        <Link to="/VisualizeUpdateReal2">Visualize Update Real 2</Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link to="/generatorMountPage">Generate Mount Page Reload</Link>
                    </li>
                    <li>
                        <Link to="/generatorMountPage5">Generate Mount 5 Page Reload</Link>
                    </li>
                    <li>
                        <Link to="/generatorMountState">Generate Mount State Reload</Link>
                    </li>
                    <li>
                        <Link to="/generatorUpdate">Generate Update</Link>
                    </li>
                    <li>
                        <Link to="/generatorMountWormUp">Generate Mount Worm Up</Link>
                    </li>
                    <li>
                        <Link to="/Test">Test</Link>
                    </li>
                </ul>
            </nav>
            <Switch>
                <Route
                    path="/generatorMountPage"
                    component={GeneratorMountPage}
                />
                <Route
                    path="/generatorMountPage5"
                    component={GeneratorMountPage5}
                />
                <Route
                    path="/generatorMountState"
                    component={GeneratorMountState}
                />
                <Route
                    path="/generatorUpdate"
                    component={GeneratorUpdate}
                />
                <Route
                    path="/generatorMountWormUp"
                    component={GeneratorMountWormUp}
                />
                <Route
                    path="/Test"
                    component={Test}
                />
                <Route
                    path="/visualizeMountPage"
                    component={VisualizeMountPage}
                />
                <Route
                    path="/visualizeMountState"
                    component={VisualizeMountState}
                />
                <Route
                    path="/visualizeMountPage5"
                    component={VisualizeMountPage5}
                />
                <Route
                    path="/visualizeUpdate"
                    component={VisualizeUpdate}
                />
                <Route
                    path="/visualizeUpdateReal"
                    component={VisualizeUpdateReal}
                />
                <Route
                    path="/visualizeUpdateReal"
                    component={VisualizeUpdateReal}
                />
                <Route
                    path="/visualizeWormUp"
                    component={VisualizeWormUp}
                />
                <Route
                    path="/VisualizeUpdateReal2"
                    component={VisualizeUpdateReal2}
                />
            </Switch>
        </Router>
    )
}

export default Routes;