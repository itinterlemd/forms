import React from 'react';  
import { Route, Redirect} from 'react-router-dom';  
import {authenticationService}  from '../service/AuthService';
import {Layout} from './LayoutPrivate';
import {LayoutNoProfile} from './LayoutNoProfile';

/** layout interna para decorarl el layout principal */
const MainLayout = ({children, ...rest}) => {      
  return (  
    
    <div className="page page-dashboard">  
          <Layout children={children} />
    </div>  
   
  )  
} 
  
const MainLayoutRoute = ({component: Component, ...rest}) => {  
  return (  
    <Route {...rest} render={matchProps => (  
      <MainLayout>  
          <Component {...matchProps} />  
      </MainLayout>  
    )} />  
  )  
};  

export const MainLayoutPrivateRoute = ({ component: Component, ...rest }) => (
   
    <Route {...rest} render={matchProps => {  
        //console.info("authenticationService.currentUserValue-->"+authenticationService.currentAutValue);
        const currentUser = authenticationService.currentAutValue;
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/login', state: { from: matchProps.location } }} />
        }
        return (<MainLayout>  
            <Component {...matchProps} />  
        </MainLayout> ) 
      }} />  
)



const LayoutNoProfDecorate = ({children, ...rest}) => {      
    return (  
      
      <div className="page page-dashboard">  
            <LayoutNoProfile children={children} />
      </div>  
     
    )  
  };
 
   
 export const MainLayoutNoProfile = ({component: Component, ...rest}) => {  
    return (  
      <Route {...rest} render={matchProps => (  
        <LayoutNoProfDecorate>  
            <Component {...matchProps} />  
        </LayoutNoProfDecorate>  
      )} />  
    )  
  };

  
export default MainLayoutRoute;  