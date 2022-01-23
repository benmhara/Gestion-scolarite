import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Provider } from "react-redux";
import PostMessages from "./Components/etudiant/PostMessages";
import PostEnseignants from "./Components/enseignant/PostEnseignants";
import PostCours from "./Components/cours/PostCours";
import PostPfes from "./Components/pfe/PostPfes";
import SearchTable from "./Components/filterTable";
import { store } from "./actions/store";
import { Container, AppBar, Typography } from "@material-ui/core";
import ButterToast, { POS_RIGHT, POS_TOP } from "butter-toast";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
//import Register from './Components/auth/Register';
//import login from './Components/auth/login';

import AuthService from "./services/auth.service";
import Login from "./Components/login.component";
import Register from "./Components/register.component";
import Home from "./Components/home.component";
import Profile from "./Components/profile.component";
import BoardUser from "./Components/board-user.component";
import BoardModerator from "./Components/board-moderator.component";
import BoardAdmin from "./Components/board-admin.component";
import EventBus from "./common/EventBus";

import Registration from "./pages/registration";

//function App() {
class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <Provider store={store}>
        <Container maxWidth="lg">
          <Router>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/" component={Register} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/registration" component={Registration} />
            </Switch>
          </Router>
          <ButterToast
            position={{ vertical: POS_TOP, horizontal: POS_RIGHT }}
          />
        </Container>
      </Provider>
    );
  }
}

export default App;
