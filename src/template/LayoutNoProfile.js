import React, { Component } from 'react';  
import classNames from 'classnames';
import {AppTopbarNoProfile} from './AppTopbar';
import {AppFooter} from './AppFooter';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'fullcalendar/dist/fullcalendar.css';
import './../layout/layout.css';
export class LayoutNoProfile extends Component {

    constructor() {
        super();
        this.state = {
            layoutMode: 'overlay',
            layoutColorMode: 'light'
        };
    }



    render() {
        //let logo = this.state.layoutColorMode === 'dark' ? 'assets/layout/images/logo-white.svg': 'assets/layout/images/logo.svg';

        let wrapperClass = classNames('layout-wrapper', {
            'layout-overlay': true,
            'layout-static-sidebar-inactive':true            
        });
       // let sidebarClassName = classNames("layout-sidebar", {'layout-sidebar-dark': this.state.layoutColorMode === 'dark'});

        return (
            <div className={wrapperClass} >
                <AppTopbarNoProfile/>
                <div className="layout-main">
                {this.props.children} 
                </div>
                <AppFooter />
                <div className="layout-mask"></div>
            </div>
        );
    }
}