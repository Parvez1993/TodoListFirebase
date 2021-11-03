import "./App.css";
import "semantic-ui-css/semantic.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "./component/Dashboard";
import Menubar from "./component/Menubar";
import Signin from "./component/Signin";
import Homepage from "./component/Homepage";
import Signup from "./component/Signup";
import PrivateRoute from "./component/PrivateRoute";
function App() {
  return (
    <>
      <Router>
        <Menubar />
        <Switch>
          <Route path="/" exact component={Homepage} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
