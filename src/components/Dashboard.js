import React, { Component } from 'react';

export class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            tasks: []
        };

    }
     componentDidMount() {
       // this.carservice.getCarsSmall().then(data => this.setState({cars: data}));
    }

    render() {
       
        
        return (
            <div className="p-grid p-fluid dashboard">
                <div className="p-col-12 p-lg-4">
                    <div className="card summary">
                        <span className="title">Users</span>
                        <span className="detail">Number of visitors</span>
                        <span className="count visitors">12</span>
                    </div>
                </div>
                <div className="p-col-12 p-lg-4">
                    <div className="card summary">
                        <span className="title">Sales</span>
                        <span className="detail">Number of purchases</span>
                        <span className="count purchases">534</span>
                    </div>
                </div>
                <div className="p-col-12 p-lg-4">
                    <div className="card summary">
                        <span className="title">Revenue</span>
                        <span className="detail">Income for today</span>
                        <span className="count revenue">$3,200</span>
                    </div>
                </div>

                <div className="p-col-12 p-md-6 p-xl-3">
                    <div className="highlight-box">
                        <div className="initials" style={{backgroundColor:'#007be5',color:'#00448f'}}><span>TV</span></div>
                        <div className="highlight-details ">
                            <i className="pi pi-search"/>
                            <span>Total Queries</span>
                            <span className="count">523</span>
                        </div>
                    </div>
                </div>
                <div className="p-col-12 p-md-6 p-xl-3">
                    <div className="highlight-box">
                        <div className="initials" style={{backgroundColor:'#ef6262',color:'#a83d3b'}}><span>TI</span></div>
                        <div className="highlight-details ">
                            <i className="pi pi-question-circle"/>
                            <span>Total Issues</span>
                            <span className="count">81</span>
                        </div>
                    </div>
                </div>
                <div className="p-col-12 p-md-6 p-xl-3">
                    <div className="highlight-box">
                        <div className="initials" style={{backgroundColor:'#20d077',color:'#038d4a'}}><span>OI</span></div>
                        <div className="highlight-details ">
                            <i className="pi pi-filter"/>
                            <span>Open Issues</span>
                            <span className="count">21</span>
                        </div>
                    </div>
                </div>
                <div className="p-col-12 p-md-6 p-xl-3">
                    <div className="highlight-box">
                        <div className="initials" style={{backgroundColor:'#f9c851',color:'#b58c2b'}}><span>CI</span></div>
                        <div className="highlight-details ">
                            <i className="pi pi-check"/>
                            <span>Closed Issues</span>
                            <span className="count">60</span>
                        </div>
                    </div>
                </div>               
            </div>
        );
    }
}