import axios from 'axios';

const urlBase = "https://campus-itli.herokuapp.com/api/v1";

export class RegisterService {
    
    getProgramasData(onComplete, onError) {
        const url = urlBase+"/programas/catalogo";
    
        return  axios.get(url)
     .then(
        function(response) {
            //console.log("response.data-->"+JSON.stringify(response.data))
            return response;
        }       
        )
     .catch(onError ? onError : (error) => console.log(error));
    }


    setContacto(contactoJSON) {
        const  url = urlBase+"/contactos/";

        let axiosConfig = {headers: {
                            'Content-Type': 'application/json;charset=UTF-8',
                            }
                            };

        //console.log("url-->"+url)
      
    return axios.post(url, contactoJSON,axiosConfig)
                .then(function (response) { 
                    return response.data
                                    
                }).catch(function (object) {                    
                    return object.response.data;
                }); 
    }  
}