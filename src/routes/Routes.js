import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes as Switch,
} from "react-router-dom";
import GeneratorMountPage from "../generators/GeneratorMountPage";
import GeneratorMountPage5 from "../generators/GeneratorMountPage5";
import GeneratorMountState from "../generators/GeneratorMountState";
import GeneratorUpdate from "../generators/GeneratorUpdate";
import GeneratorMountWormUp from "../generators/GeneratorMountWormUp";
import GeneratorCallback from "../generators/GeneratorCallback";
import VisualizeMountPage from "../visualize/VisualizeMountPage";
import VisualizeMountState from "../visualize/VisualizeMountState";
import VisualizeMountPage5 from "../visualize/VisualizeMountPage5";
import VisualizeUpdate from "../visualize/VisualizeUpdate";
import VisualizeUpdateReal from "../visualize/VisualizeUpdateReal";
import VisualizeWormUp from "../visualize/VisualizeWormUp";
import VisualizeUpdateReal2 from "../visualize/VisualizeUpdateReal2";
import VisualizeCallback from "../visualize/VisualizeCallback";

import {Home} from "../Home";

import './routes.css';

const Test = () => {
  return null;
}

const Routes = () => {
  return (
    <Router>
      <Test/>
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
          <li>
            <Link to="/VisualizeCallback">Visualize Callback</Link>
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
            <Link to="/generatorCallback">Generate Callback</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route
          path="/"
          element={<Home/>}
        />
        <Route
          path="/generatorMountPage"
          element={<GeneratorMountPage/>}
        />
        <Route
          path="/generatorMountPage5"
          element={<GeneratorMountPage5/>}
        />
        <Route
          path="/generatorMountState"
          element={<GeneratorMountState/>}
        />
        <Route
          path="/generatorUpdate"
          element={<GeneratorUpdate/>}
        />
        <Route
          path="/generatorMountWormUp"
          element={<GeneratorMountWormUp/>}
        />
        <Route
          path="/visualizeMountPage"
          element={<VisualizeMountPage/>}
        />
        <Route
          path="/visualizeMountState"
          element={<VisualizeMountState/>}
        />
        <Route
          path="/visualizeMountPage5"
          element={<VisualizeMountPage5/>}
        />
        <Route
          path="/visualizeUpdate"
          element={<VisualizeUpdate/>}
        />
        <Route
          path="/visualizeUpdateReal"
          element={<VisualizeUpdateReal/>}
        />
        <Route
          path="/visualizeUpdateReal"
          element={<VisualizeUpdateReal/>}
        />
        <Route
          path="/visualizeWormUp"
          element={<VisualizeWormUp/>}
        />
        <Route
          path="/VisualizeUpdateReal2"
          element={<VisualizeUpdateReal2/>}
        />
        <Route
          path="/generatorCallback"
          element={<GeneratorCallback/>}
        />
        <Route
          path="/VisualizeCallback"
          element={<VisualizeCallback/>}
        />
      </Switch>
    </Router>
  )
}

export default Routes;