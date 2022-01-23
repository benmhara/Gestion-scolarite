import React, { Component } from 'react';
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import './App.css';
import { Provider } from "react-redux";
import PostMessages from "../Components/etudiant/PostMessages";
import PostEnseignants from "../Components/enseignant/PostEnseignants";
import PostCours from '../Components/cours/PostCours';
import PostPfes from '../Components/pfe/PostPfes';
import SearchTable from '../Components/filterTable'; 
import { store } from "../actions/store";
import { Container, AppBar, Typography } from "@material-ui/core";
import ButterToast, { POS_RIGHT, POS_TOP } from "butter-toast";
import Navbar from '../Components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
//import Register from './Components/auth/Register';
//import login from './Components/auth/login';

import AuthService from "../services/auth.service";
import Login from "../Components/login.component";
import Register from "../Components/register.component";
import Home from "../Components/home.component";
import Profile from "../Components/profile.component";
import BoardUser from "../Components/board-user.component";
import BoardModerator from "../Components/board-moderator.component";
import BoardAdmin from "../Components/board-admin.component";
import EventBus from "../common/EventBus";
//function App() {
  class Page extends Component {
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
          
          
        
        <div>
        <nav className="navbar navbar-expand ">
          <Link to={"/"} className="navbar-brand">
            
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
             
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut} >
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
               
              </li>

              <li className="nav-item">
               
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
         
        </div>

        { /*<AuthVerify logOut={this.logOut}/> */ }
      </div>

      <Navbar/>
          <Switch>
            
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/register" component={Register} />
            <Route path="/postMessages" component={PostMessages}/>
            <Route path="/postenseignants" component={PostEnseignants}/>
            <Route path="/postPfes" component={PostPfes}/>
            <Route path="/SearchTable" component={SearchTable}/>
            <Route path="/" component={PostCours}/>
          
          </Switch>
          
          
      </Router>
        <ButterToast position={{ vertical: POS_TOP, horizontal: POS_RIGHT }} />
      </Container>
    </Provider>
    
  );
}}

export default Page;