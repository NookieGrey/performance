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
import VisualizeMountPage from "./VisualizeMountPage";
import VisualizeMountState from "./VisualizeMountState";
import VisualizeMountPage5 from "./VisualizeMountPage5";
import VisualizeUpdate from "./VisualizeUpdate";

const Routes = () => {
    return (
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/generatorMountPage">Generate Mount Page Reload</Link>
                    </li>
                    <li>
                        <Link to="/generatorMountPage5">Generate Mount 5 Page Reload</Link>
                    </li>
                    <li>
                        <Link to="/GeneratorMountState">Generate Mount State Reload</Link>
                    </li>
                    <li>
                        <Link to="/generatorUpdate">Generate Update</Link>
                    </li>
                    <li>
                        <Link to="/visualizeMountState">Visualize Mount State Reload</Link>
                    </li>
                    <li>
                        <Link to="/visualizeMountPage">Visualize Mount Page Reload</Link>
                    </li>
                    <li>
                        <Link to="/visualizeMountPage5">Visualize Mount 5 Page Reload</Link>
                    </li>
                    <li>
                        <Link to="/visualizeUpdate">Visualize Update</Link>
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
                    path="/GeneratorMountState"
                    component={GeneratorMountState}
                />
                <Route
                    path="/generatorUpdate"
                    component={GeneratorUpdate}
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
            </Switch>
        </Router>
    )
}

export default Routes;