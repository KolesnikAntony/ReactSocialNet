import React, {useEffect} from 'react';
import style from './App.module.css';
import Sidebar from './components/Sidebar/Sidebar';
import {Redirect, Route, Switch} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import Header from "./components/Header/Header";
import Login from "./components/Login/login";
import {connect} from "react-redux";
import {initializing} from "./redux/app-reducer";
import Preloader from "./common/Preloader/Preloader";
import Error404 from "./components/ErrorComponents/Error404";
import {requestInitialized} from "./redux/selectors";
import Dialogs from "./components/Dialogs/Dialogs";


const App = ({initializing,initialized}) => {

    useEffect(()=> initializing(), [initialized]);

    if(!initialized) {
        return <Preloader/>
    }
    return  (
        <div className={style.app}>
            <Header/>
            <Sidebar/>
            <section className={style.content}>
                <Switch>
                    <Route path="/profile/:userId?" render={()=> <ProfileContainer />}/>
                    <Route path="/dialogs" render={()=> <Dialogs/>}/>
                    <Route path="/users" render={()=> <UsersContainer  />}/>
                    <Route path="/login" render={()=> <Login />}/>
                    <Redirect exact from='/' to='/profile'/>
                    <Route path='*' render={() => <Error404/>}/>
                </Switch>
            </section>
        </div>
    );
};

const mapStateToProps = state => (
    {
        initialized : requestInitialized(state),
    }
);

export default connect(mapStateToProps, {initializing} )(App);
