import axios from 'axios';

const urlBase = "http://127.0.0.1:5000/api/v1";

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

    getRecursosLabels(label, onComplete, onError) {
        const  url = urlBase+"/resource/?labels__contains="+label;
     return  axios.get(url)
     .then(onComplete ? onComplete : res => res.data.objects)
    .catch(onError ? onError : (error) => console.log(error));
    }

    getPhasesRecurso(resource, onComplete, onError) {
        const  url = urlBase+"/phase/?resources="+resource;
        console.log("url-->"+url)
     return  axios.get(url)
     .then(onComplete ? onComplete : res => res.data.objects)
    .catch(onError ? onError : (error) => console.log(error));
    }
    
  
}