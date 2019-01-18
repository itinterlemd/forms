import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class AppTopbar extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            showToggleMenu:      false,
    }
}
   
    static defaultProps = {
        onToggleMenu: null,
        showToggleMenu: true
    }

    static propTypes = {
        onToggleMenu: PropTypes.func.isRequired
    }

    render() {

        return (
            <div className="layout-topbar clearfix">
                {this.props.showToggleMenu?<a className="layout-menu-button" onClick={this.props.onToggleMenu}>
                    <span className="pi pi-bars"/>
                </a>:null}
                <div className="layout-topbar-icons">
                <img src="assets/layout/images/logo-white.svg" alt="" width="80"/>                

                </div>
            </div>
        );
    }
}