import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import GeneratorMountPage from "../generators/GeneratorMountPage";
import GeneratorMountPage5 from "../generators/GeneratorMountPage5";
import GeneratorMountState from "../generators/GeneratorMountState";
import GeneratorUpdate from "../generators/GeneratorUpdate";
import GeneratorMountWormUp from "../generators/GeneratorMountWormUp";
import VisualizeMountPage from "../visualize/VisualizeMountPage";
import VisualizeMountState from "../visualize/VisualizeMountState";
import VisualizeMountPage5 from "../visualize/VisualizeMountPage5";
import VisualizeUpdate from "../visualize/VisualizeUpdate";
import VisualizeUpdateReal from "../visualize/VisualizeUpdateReal";
import VisualizeWormUp from "../visualize/VisualizeWormUp";
import VisualizeUpdateReal2 from "../visualize/VisualizeUpdateReal2";

import './routes.css';

const Routes = () => {
    return (
        <Router>
            <nav className="menu">
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