import React, { Component } from 'react';
import classNames from 'classnames';
import {authenticationService}  from './../service/AuthService';
import { Redirect} from 'react-router-dom';  

export class AppInlineProfile extends Component {

    constructor() {
        super();
        this.state = {
            expanded: false,
            logout:false,
            profile:{},
            isLoadProfile:false,
            
        };
        this.onClick = this.onClick.bind(this);
        this.logout = this.logout.bind(this);
        this.loadProfile=this.loadProfile.bind(this);
    }
    loadProfile(){
         const prof=authenticationService.currentProfile;
        let  _profile ={};
        if(prof.isChecked === undefined){
            _profile=JSON.parse(prof);
        }else{
            _profile=prof;
        }
        this.setState({isLoadProfile:true,profile:_profile});
    }

    componentDidMount(){
        this.loadProfile();
       }

    onClick(event) {
        this.setState({expanded: !this.state.expanded,logout:false});
        event.preventDefault();
    }

    goLogin = () => {
        if (this.state.logout) {
          return <Redirect to='/login' />
        }
      }

    logout(event) {
        this.setState({logout:false});
        event.preventDefault();
        authenticationService.logout();
        this.setState({logout:true});
       // window.location = "/login";
    }

    render() {
        
        return  (
            <div className="profile">
                {this.goLogin()}
                <div>
                    <img src="assets/layout/images/profile.png" alt="" />
                </div>
                <button className="p-link profile-link" onClick={this.onClick}>
                    <span className="username">{this.state.profile?this.state.profile.username:"Invitado"}</span>
                    <i className="pi pi-fw pi-cog"/>
                </button>
                <ul className={classNames({'profile-expanded': this.state.expanded})}>
                    <li><button className="p-link"><i className="pi pi-fw pi-user"/><span>Account</span></button></li>
                    <li><button className="p-link"><i className="pi pi-fw pi-inbox"/><span>Notifications</span><span className="menuitem-badge">2</span></button></li>
                    <li><button className="p-link" onClick={this.logout} ><i className="pi pi-fw pi-power-off"/><span>Logout</span></button></li>
                </ul>
            </div>
        );
    }
}