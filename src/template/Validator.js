import React from 'react';
//import SimpleReactValidator from 'simple-react-validator';
import {Message} from 'primereact/message';

export function getConfigsValidations() {

      return {
        element: (message, className) =>  <Message severity="error" text={message} />,
        // locale: 'es',
        autoForceUpdate: this,
        className: 'p-error',
        messages: {
          email: 'Email inválido.',
          required: 'Campo Obligatorio.',
          //default: "Womp! That's not right!"
        },
        validators: {
          password: { // name the rule
            message: 'Mínimo ocho caracteres, al menos una letra mayúscula, una letra minúscula y un número. (Ej. Kjhplkj0)', // :attribute give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
            rule: function(val, params, validator) { // return true if it is succeeds and false it if fails validation. the testRegex method is available to give back a true/false for the regex and given value
              // check that it is a valid IP address and is not blacklisted
              //Minimum six characters, at least one uppercase letter, one lowercase letter and one number:
              return validator.helpers.testRegex(val,/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/) && params.indexOf(val) === -1
            }
          }
        }
    }
}
