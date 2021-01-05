import React from 'react';
import style from './App.module.css';
import Sidebar from './components/Sidebar/Sidebar';
import {Route} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/login";
import {connect} from "react-redux";
import {getAuthUser} from "./redux/auth-reducer";
import {initializing} from "./redux/app-reducer";
import Preloader from "./common/Preloader/Preloader";

class App extends React.Component{
    componentDidMount() {
        this.props.initializing();
    }
    render(){
        if(!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className={style.app}>
                <HeaderContainer/>
                <Sidebar/>
                <div className={style.content}>
                    <Route path="/profile/:userId?" render={()=> <ProfileContainer />}/>
                    <Route path="/dialogs" render={()=> <DialogsContainer  />}/>
                    <Route path="/users" render={()=> <UsersContainer  />}/>
                    <Route path="/login" render={()=> <Login />}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state)=> (
    {
        initialized : state.app.initialized,
    }
);

export default connect(mapStateToProps, {initializing} )(App);
