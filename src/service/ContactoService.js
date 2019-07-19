import {config,responseTO,profile} from './Constants';
import {axiosAuthOptions} from './auth-header.js';
import axios from 'axios';

export const contactoSerivice = { 
    getListContatos
}
;
function getListContatos(page,size,filter) {

    let URL=`${config.apiUrl}/api/v1/contactos/?page=${page}&pageSize=${size}`;

    if(filter && filter.numTelefonoNombre){
        URL=URL+'&filter='+encodeURI(JSON.stringify(filter));
    }

        return   axios.get(URL, axiosAuthOptions()).then(function(response) {
                        responseTO.error=false;
                        responseTO.data=response.data.content;
                        //const { headers, json } = response;
                        return responseTO;                        
           }       
           )
        .catch(
           function (object) {  
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