import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import GeneratorMount from "./GeneratorMount";
import GeneratorUpdate from "./GeneratorUpdate";
import VisualizeMount from "./VisualizeMount";

const Routes = () => {
    return (
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/generatorMount">Generate Mount</Link>
                    </li>
                    <li>
                        <Link to="/generatorUpdate">Generate Update</Link>
                    </li>
                    <li>
                        <Link to="/visualizeMount">Visualize Mount</Link>
                    </li>
                </ul>
            </nav>
            <Switch>
                <Route
                    path="/generatorMount"
                    component={GeneratorMount}
                />
                <Route
                    path="/generatorUpdate"
                    component={GeneratorUpdate}
                />
                <Route
                    path="/visualizeMount"
                    component={VisualizeMount}
                />
            </Switch>
        </Router>
    )
}

export default Routes;