import React, {Component} from 'react';
import {DataView} from 'primereact/dataview';
import {contactoSerivice} from '../../service/ContactoService';
import {Messages} from 'primereact/messages';
//import {Panel} from 'primereact/panel';
import {Card} from 'primereact/card';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import {Accordion,AccordionTab} from 'primereact/accordion';
//import {Panel} from 'primereact/panel';

export class ListContactos extends Component {
    constructor() {
        super();
        this.state = {
            dataViewValue:[],
            layout: 'grid',
            valueSarch: '',
            jsonSearch: {numTelefonoNombre:null},
            isDisabledSearch:true,
            sortOptions: [
                {label: 'Nombre Z-A', value: '!nombre'},
                {label: 'Nombre A-Z', value: 'nombre'},
                {label: 'Teléfono', value: 'numTelefono'}
            ],
            first: 0,
            rows: 4,
            totalRecords: 0,
            pagesTouched: []
        };
        this.dataViewItemTemplate = this.dataViewItemTemplate.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
        this.onInputSearch = this.onInputSearch.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onPage = this.onPage.bind(this);
    }

    componentDidMount() {
       this.init();
    }
    init=()=>{
        contactoSerivice.getListContatos(0,this.state.rows).then(response => {
            if(!response.error){
                this.setState({    pagesTouched:[]});     
                this.setState({
                    dataViewValue: response.data,
                    totalRecords:response.totalElements,
                    pagesTouched:this.state.pagesTouched.concat(0)})
                }else{
                    this.messages.show({life: 7000,closable:false,severity: 'error', detail:response.message});
                }
           
            
        });
    }

    selectAvatar =()=>{
        const rand = 1 + Math.random() * (4 - 1);    
        return "assets/layout/images/avatar_"+parseInt(rand)+".png";     
  };

    dataViewItemTemplate(contacto,layout) {
        if (!contacto) {
            return <div/>;
        }
        if(!contacto.urlAvatar){
            contacto.urlAvatar=this.selectAvatar();
        }
        if (layout === 'grid') {

            const header =(
                <div className="p-grid">
                <div className="p-col-fixed" style={{width:'35px',marginLeft:'25px'}}>
                <img src={contacto.urlAvatar} alt={contacto.nombre}  width="35" />
                </div>
                <div className="p-col"> {contacto.nombre} 
            </div>
                </div>);
            return (
              
                <div style={{ padding: '.5em' }} className="p-col-12 p-md-3">
                     <Card   header={header} >
                     <div className="car-detail">
                     <div className="p-grid">
                         <div className="p-col-fixed card-text-bold" style={{width:'80px'}}>Teléfono:</div>
                        <div className="p-col" style={{minWidth:'110px',}}>{contacto.numTelefono}</div>
                        <div className="p-col-fixed card-text-bold" style={{width:'70px'}}>Email:</div>
                        <div className="p-col ">{contacto.email}</div>
                    </div>
                               
                        </div>
                        <Accordion>
                        <AccordionTab header="Interezado por:">
                        <ul>
                            {contacto.programas.map((prog,j)=>(  
                            <li key={"p_prog_li_"+j}>({prog.fecCambio}) {prog.programa.nombreCorto} 
                            </li>
                            ))}
                        </ul>
                         </AccordionTab>
                        </Accordion>
                    </Card>
                   
                </div>
            );
        }
    }


    onSortChange(event) {
        let value = event.value;

        if (value.indexOf('!') === 0)
            this.setState({sortOrder: -1, sortField:value.substring(1, value.length), sortKey: value});
        else
            this.setState({sortOrder: 1, sortField:value, sortKey: value});
    }
    onInputSearch(event) {
       // let filter = this.dv.props.value.filter((obj) => obj.nombre.includes(event.target.value));
       let jsonSearch=this.state.jsonSearch;
       jsonSearch.numTelefonoNombre=event.target.value;

       
       this.setState({ 
           valueSarch:event.target.value,
           isDisabledSearch:event.target.value==='',
           jsonSearch           
        });

        if(event.target.value===''){
            this.init();
        }
    }
    onSearch(event) {
        if(!this.state.valueSarch || this.state.valueSarch===''){
            return;
        }
        
        contactoSerivice.getListContatos(0,this.state.rows,this.state.jsonSearch).then(response => {
            if(!response.error){

                this.setState({pagesTouched:[]});   
                this.setState({
                    dataViewValue: response.data,
                    first: 0,
                    totalRecords:response.totalElements,
                    pagesTouched:this.state.pagesTouched.concat(0)
                })
                }else{
                    this.messages.show({life: 7000,closable:false,severity: 'error', detail:response.message});
                }
           
            
        });

        this.setState({
            isDisabledSearch:true
         });
    }
    onPage(event) {
       
        const page = Math.abs(event.first/this.state.rows);
        const startIndex = event.first
       // const isTouched=this.state.pagesTouched.find(p => p === page);
       const isTouched=this.state.pagesTouched.indexOf(page)
        if(isTouched <0){

            contactoSerivice.getListContatos(page,this.state.rows,this.state.jsonSearch).then(response => {
                if(!response.error){
                 this.setState({
                        first: startIndex,
                        dataViewValue: this.state.dataViewValue.concat(response.data),
                        totalRecords:response.totalElements,
                        pagesTouched:this.state.pagesTouched.concat(page)
                    });
                    }else{
                        this.messages.show({life: 7000,closable:false,severity: 'error', detail:response.message});
                    }
            
                
            });
    }else{

        this.setState({
            first: startIndex
        });
    }

    }
    render() {

 /* <div className="p-col-6 p-md-4">
                    <InputText placeholder="Buscar por nombre" onKeyUp={event =>this.setState({ dataViewValue:this.dv.props.value.filter((obj) => obj.nombre.includes(event.target.value))})}/>
                </div>*/
        const header = (
            <div className="p-grid">
                <div className="p-col-12 p-md-4" style={{textAlign:'middle'}}>
                    <Dropdown options={this.state.sortOptions} value={this.state.sortKey} placeholder="Ordenar por" onChange={this.onSortChange} />
                </div>
                <div className="p-col-12 p-md-4">
               
                    <InputText placeholder="Buscar por nombre" onChange={this.onInputSearch}/>
                    <Button icon="pi pi-search" onClick={this.onSearch} disabled={this.state.isDisabledSearch}/>
              
                </div>
              
            </div>
        );

        return (
            <div className="p-grid">
            <div className="p-col-12">
                <Messages ref={(el) => this.messages = el} />
            </div>

            <div className="p-col-12">
            <div className="card card-w-title">
                <h1>Datos de Contactos</h1>
                <DataView ref={el => this.dv = el} value={this.state.dataViewValue} filterBy="nombre" 
                    itemTemplate={this.dataViewItemTemplate} layout={this.state.layout}
                    paginatorPosition={'both'} paginator={true}  header={header} 
                    sortOrder={this.state.sortOrder} sortField={this.state.sortField}
                    rows={this.state.rows}
                    totalRecords={this.state.totalRecords}
                    lazy={true} first={this.state.first} onPage={this.onPage} 
                    />
            </div>
        </div>
        </div>
            
        );
    }
}