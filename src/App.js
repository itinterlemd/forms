import React, {Component} from 'react';
import {Dashboard} from './components/Dashboard';
import {HomePage} from './components/HomePage';
import {Contacto,ListContactos} from './components/contactos/Exporter';
import {EmptyPage} from './components/EmptyPage';
import {Login} from './template/Login';
import ScrollToTop from './template/ScrollToTop';
import {NotFoundPage} from './template/NotFoundPage';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';  
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'fullcalendar/dist/fullcalendar.css';
import './layout/layout.css';
import './App.css';

/** Layouts **/  
import /*MainLayoutRoute,*/ {MainLayoutPrivateRoute,MainLayoutNoProfile} from "./template/MainLayout";  

class App extends Component {

  
  render() {
      return (
          <Router>  
            <ScrollToTop>
          <Switch>  
            <Route exact path="/"  component={HomePage}>  
              <Redirect to="/home" />  
            </Route>
            <MainLayoutNoProfile path="/contactos" component={Contacto} />  


            <MainLayoutPrivateRoute path="/dashboard" component={Dashboard} />
            <MainLayoutPrivateRoute path="/v1/contactos" component={ListContactos} />
            
            <MainLayoutPrivateRoute path="/empty" component={EmptyPage} />
            
            <Route  path="/login/"  component={Login}/>  
            <Route component={NotFoundPage} />
          </Switch> 
          </ScrollToTop> 
        </Router> 
      );
  }
}

export default App;
