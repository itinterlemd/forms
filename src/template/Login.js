import React, {Component} from 'react';
import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import {Button} from 'primereact/button';
import { authenticationService } from '../service/AuthService';
import {Messages} from 'primereact/messages';
import {getConfigsValidations} from './Validator';
import SimpleReactValidator from 'simple-react-validator';
import { Redirect } from 'react-router-dom'
//const validations=validators;


export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {    
            Username: "",
            Password: "",
            errors:{},
            touched:{},
            success:false, 
            completado:false,
            message:""
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.validator =new SimpleReactValidator(getConfigsValidations());
        this.renderRedirect=this.renderRedirect.bind(this);
        
    }
    componentDidMount(){
        authenticationService.logout();
       }

    handleBlur(evt){
        console.info(this.props.keyfilter);
        this.setState({
          touched: { ...this.state.touched, [evt.target.name]: true },
        });


      }

      onChangeInput(e) {
        this.setState({
            [e.target.name]: e.target.value,sucess:false
        })
    }

    renderRedirect = () => {
        if (this.state.success) {          
          return <Redirect to='/dashboard' />
        }
      }
  

    handleLogin(event) {
        event.preventDefault();
        this.messages.clear();  
        
        this.setState({success:false});
      //console.info(this.validator)
        if( this.validator.allValid() ){
            
            authenticationService.login(this.state.Username,this.state.Password,this.state.success).then( response => {
                    if(!response.error){
                        
                        this.setState({Username:"",Password:"",success:true});
                        }else{
                            this.messages.show({life: 7000,closable:false,severity: 'error', detail:response.message});
                        } 
            });            
             
                
        } else {
            this.validator.showMessages();
            this.forceUpdate();
          } 
 
    }

    render() {
       
        return (
           
                           
        <div className="login-body">
                {this.renderRedirect()}
			<div className="login-type">
				<div className="card login-panel p-fluid">
					<div className="p-grid">
						<div className="p-col-12">
							<img src="assets/layout/images/logo-ultima.svg" alt="ultima"/>
						</div>
                        <div className="p-col-12">
                        <Messages ref={(el) => this.messages = el} />
                        </div>
                        
						<div className="p-col-12">
                       
						<div className="p-inputgroup">
                                 <span className="p-inputgroup-addon"><i className="pi pi-user" /></span>
                                 <InputText placeholder="Username" value={this.state.Username}
                                 onChange={this.onChangeInput} name="Username" id="Username" 
                                 className={!this.validator.fieldValid('Username')  ? "p-error" : ""}/>
                                
                             </div> 
                             {this.validator.message('Username', this.state.Username, 'required')} 
						</div>
						<div className="p-col-12">
						<div className="p-inputgroup">
                             <span className="p-inputgroup-addon"><i className="pi pi-key" /></span>
                                         <Password id="Password" placeholder="Password" name="Password" 
                                         value={this.state.Password} onChange={this.onChangeInput} feedback={false} 
                                         tooltip="Mínimo seis
                                          caracteres, al menos una letra mayúscula, una letra minúscula y un número. (Ej. Kjh654)"
                                         className={!this.validator.fieldValid('Password')  ? "p-error" : ""}/>                                        
                          </div>
                          {this.validator.message('Password', this.state.Password, 'required')}
						</div>
						<div className="p-col-12">
							<Button label="Ingresar" icon="pi-md-person" className="p-button-raised" onClick={this.handleLogin} />
							<Button label="Recuperar Password" icon="pi-md-help" className="p-button-secondary p-button-raised" />
						</div>
                        <div className="p-col-12">
                        <div >PrimeReact</div>
                        </div>
                       
					</div>
				</div>
			</div>


			
		</div>
        );
    }
}