import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class AppTopbar extends Component {

    static defaultProps = {
        onToggleMenu: null
    }

    static propTypes = {
        onToggleMenu: PropTypes.func.isRequired
    }

    render() {
        return (
            <div className="layout-topbar clearfix">
                <button className="p-link layout-menu-button" onClick={this.props.onToggleMenu}>
                    <span className="pi pi-bars"/>
                </button>
                <div className="layout-topbar-icons">
                <img src="assets/layout/images/logo-white.svg" alt="" width="80"/>       
                </div>
            </div>
        );
    }
}

export class AppTopbarNoProfile extends Component {

    
    render() {
        return (
            <div className="layout-topbar clearfix">
                <div className="layout-topbar-icons">
                <img src="assets/layout/images/logo-white.svg" alt="" width="80"/>       
                </div>
            </div>
        );
    }
}