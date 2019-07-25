import { authenticationService } from '../service/AuthService';
export const axiosAuthOptions= () =>{
    const aut = authenticationService.currentAutValue;
    if (aut && aut.accessToken) {
        return { 
        headers: {
        'Content-Type': 'application/json',
        Authorization: aut.tokenType+' '+aut.accessToken,
        Accept: 'application/json'
    },
    responseType:'json'
}
    } else {
        return {
            headers: {
        'Content-Type': 'application/json',      
        Accept: 'application/json'
    },
    responseType:'json'
}
}
}