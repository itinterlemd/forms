import {config,responseTO,profile} from './Constants';
import {axiosAuthOptions} from './auth-header.js';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
const AUTH=config.auth;
const PROFILE=profile.ID;

const autSubject = new BehaviorSubject(JSON.parse(localStorage.getItem(AUTH)));
const autProfile = new BehaviorSubject(localStorage.getItem(PROFILE));

export const authenticationService = { 
    login,
    logout,
    loadProfile,
    currentAut: autSubject.asObservable(),
    profile: autProfile.asObservable(),
    get currentAutValue () { return autSubject.value },
    get currentProfile () { return autProfile.value }   
}
;


function login(Username, Password) {

    let data = {
        'username': Username,
        'password': Password     
    };

//console.info("axiosConfig->"+axiosConfig);
   return  axios.post(`${config.apiUrl}/api/auth/signin`,data,axiosAuthOptions())
                .then(function (response) { 
                    localStorage.setItem(AUTH, JSON.stringify(response.data));
                    autSubject.next(response.data);                   

                    profile.username=Username;  
                    profile.isLoged=true;  
                               
                    localStorage.setItem(PROFILE,JSON.stringify(profile));
                    autProfile.next(profile);
                    /*responseTO.data=response.data;
                    responseTO.error=false;*/

                    return loadProfile(Username).then(function (response) {
                       if(response.error){
                           logout();                         
                       } 
                       return response;
                    });
                  //  return responseTO;
                                    
                }).catch(function (object) {  
                    logout();
                    console.info("object->"+object);
                    if(object.isAxiosError){
                        responseTO.message=object.toJSON().message;
                        responseTO.error=true;
                        if(object.response){
                            responseTO.message=object.response.data.message;
                        } 
                       
                        return responseTO;
                    }else{
                        return object.response.data;
                    }                   
                }); 
                // window.btoa(Username + ':' + Password);

    
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(AUTH);
    localStorage.removeItem(PROFILE);
    autSubject.next(null);
    autProfile.next(null);
}



function loadProfile(user) {

    const profile=authenticationService.currentProfile;
    let URL=`${config.apiUrl}/api/users/profile/${user}`;

        return   axios.get(URL, axiosAuthOptions()).then(function(response) {
                        let obj=response.data;                        
                        profile.username=obj.username;
                        profile.name=obj.name;
                        profile.email=obj.email;
                        profile.rols=obj.roles;
                        profile.isChecked=true;
                        localStorage.setItem(PROFILE,JSON.stringify(profile));
                        autProfile.next(profile);

                        responseTO.error=false;
                        responseTO.data=profile;
                        return responseTO;                        
           }       
           )
        .catch(
           function (object) {  
           // logout();
            console.info("object->"+object);
            if(object.isAxiosError){
                responseTO.message=object.toJSON().message;
                responseTO.error=true;
                if(object.response){
                    responseTO.message=object.response.data.message;
                    if(object.response.status===403){
                        responseTO.message="Acceso denegado.";
                    }
                }                
                return responseTO;
            }else{
                responseTO.error=false;
                responseTO.data=profile;
                return responseTO;
            }                  
        }    
           );
    
}


