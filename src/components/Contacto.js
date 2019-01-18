import React, { Component } from 'react';
import {RegisterService} from '../service/RegisterService';
import {InputText} from 'primereact/inputtext';
import {Checkbox} from 'primereact/checkbox';
import {Button} from 'primereact/button';
import {Messages} from 'primereact/messages';
const validationEmail = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;
const validationPhone = /^[0-9\b]+$/;
let  contactoJSON= {nombre: "",
            email: "",
            numTelefono: "",
            programas: []};

function validate(email, nombre, numTelefono) {
    // true means invalid, so our conditions got reversed email.length === 0 &&   
    return {
      email: !validationEmail.test(email),
      nombre: nombre.length < 4,
      numTelefono:numTelefono.length<10 || !validationPhone.test(numTelefono) ,


    };
  }

export class Contacto extends Component {

    constructor() {
        super();
        this.state = {    
            programasData: [],       
            programasSelected: [],
            nombre: "",
            email: "",
            numTelefono: "",
            programas: [],
            errors:{},
            touched:{},
            success:false, message:""
        };

        this.registerService = new RegisterService();
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    componentDidMount(){
     this.registerService.getProgramasData(this).then(res => {
        const programasData = res.data;
        this.setState({ programasData });
      })
    }

    onChangeInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleBlur = (field) => (evt) => {
        this.setState({
          touched: { ...this.state.touched, [field]: true },
        });
      }

    handleSubmit = (evt) => {
        if (!this.canBeSubmitted()) {
          evt.preventDefault();
          return;
        }
        const  { email, nombre ,numTelefono,programasSelected } = this.state;
        contactoJSON.email=email;
        contactoJSON.nombre=nombre;
        contactoJSON.numTelefono=numTelefono;
        programasSelected.map((pr,i)=>(
            contactoJSON.programas[i]={idPrograma:pr}

        ));

        
     this.registerService.setContacto(contactoJSON).then( response => { 
           const message=response.message;
           const success=response.success;
            this.setState({success,message}); 
            if(this.state.message!==""){
                if(this.state.success){
                        this.messages.show({severity: 'success', summary: 'Completado:', detail: this.state.message});  
                        this.setState({email:"", nombre:"" ,numTelefono:"",programasSelected :[]})
                    }else{
                        this.messages.show({severity: 'error', summary: 'Error:', detail:this.state.message});
                    } 
        }
       

          });

       // console.log('response->'+JSON.stringify(response))
       
        //
        //console.log('contactoJSON->'+JSON.stringify(contactoJSON))
      }

      canBeSubmitted() {
        const errors = validate(this.state.email, this.state.nombre,this.state.numTelefono);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return !isDisabled;
      }

  
    onCheckboxChange(event){
        let selected = [...this.state.programasSelected];
       

        if (event.checked){
            selected.push(event.value);
        }
        else
            selected.splice(selected.indexOf(event.value), 1);

        this.setState({programasSelected: selected});
    }

    render() {
        const errors = validate(this.state.email, this.state.nombre,this.state.numTelefono);     
        //console.log('errors-->'+JSON.stringify(errors));  
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        const shouldMarkError = (field) => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];
            
            return hasError ? shouldShow : false;
          };
        return (
            <div className="p-g p-fluid">
           
            
                <div className="p-g-12">
               
                    <div className="card card-w-title">
                        <h1>Datos de Contacto</h1>
                        <div className="p-g form-group">
                            <div className="p-g-12 p-md-4">
                            <span className="p-float-label">
                                <InputText id="in" type="text" size="60" name="nombre" onBlur={this.handleBlur('nombre')} className={shouldMarkError('nombre')  ? "p-error" : ""}
                                value={this.state.nombre} onChange={this.onChangeInput.bind(this)} style={{textTransform: 'uppercase'}}/>
                                <label htmlFor="in">Nombre Completo *</label>
                            </span>
                            </div>
                            <div className="p-g-12 p-md-4">
                            <span className="p-float-label">
                                <InputText id="in2" type="text" name="email" onBlur={this.handleBlur('email')} className={shouldMarkError('email')  ? "p-error" : ""} size="60"
                                value={this.state.email} onChange={this.onChangeInput.bind(this)}/>
                                 <label htmlFor="in2">Email * (me@example.com) </label>
                                 </span>
                            </div>
                            <div className="p-g-12 p-md-4">
                            <span className="p-float-label">
                                <InputText id="in3" type="text" name="numTelefono" onBlur={this.handleBlur('numTelefono')} className={shouldMarkError('numTelefono')  ? "p-error" : ""} size="30"
                                value={this.state.numTelefono} onChange={this.onChangeInput.bind(this)}/>
                                <label htmlFor="in3">Celular *</label>
                                 </span>
                            </div>
                          
                        </div>
                    </div>

                <div className="card card-w-title">
                        <h1>Información de interés</h1>
                        <div className="p-g">

                        {this.state.programasData ?  this.state.programasData.map((prog,i) =>(
                            <div className="p-g-12 p-md-4" id={'div_chk_'+i} key={i}>
                            <Checkbox inputId={'chk_'+i} value={prog.id} onChange={this.onCheckboxChange} checked={this.state.programasSelected.indexOf(prog.id)!== -1}/>
                            <label htmlFor={'chk_'+i} className="p-checkbox-label">{prog.nameShort}</label>
                    </div>                         
                         )):null}
                           
                          
                        </div>
                    </div>

                    
                </div>
                <div className="p-g-12 " style={{textAlign:'center'}}>
                <Messages ref={(el) => this.messages = el} />
             <Button label="Solicitar Información" style={{marginBottom:'10px'}} disabled={isDisabled}
             className="p-button-info p-button-raised" onClick={this.handleSubmit}/>
              
</div>

                 </div>
        );
    }
}