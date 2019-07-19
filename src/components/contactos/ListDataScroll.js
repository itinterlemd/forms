import React, {Component} from 'react';
import {DataView, DataViewLayoutOptions} from 'primereact/dataview';
import {contactoSerivice} from '../../service/ContactoService';
import {Messages} from 'primereact/messages';
import {Panel} from 'primereact/panel';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
//import {Panel} from 'primereact/panel';

export class ListContactos extends Component {
    constructor() {
        super();
        this.state = {
            dataViewValue:[],
            layout: 'list',
            sortOptions: [
                {label: 'Z-A', value: '!nombre'},
                {label: 'A-Z', value: 'nombre'},
                {label: 'Teléfono', value: 'numTelefono'}
            ]
        };
        this.dataViewItemTemplate = this.dataViewItemTemplate.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
        this.onInputSearch = this.onInputSearch.bind(this);
    }

    componentDidMount() {
        contactoSerivice.getListContatos(0,20).then(response => {
            if(!response.error){
                        
                this.setState({dataViewValue: response.data})
                }else{
                    this.messages.show({life: 7000,closable:false,severity: 'error', detail:response.message});
                }
           
            
        });
    }

    dataViewItemTemplate(contacto,layout) {
        if (!contacto) {
            return;
        }

        let src = "assets/layout/images/avatar_1.png";

        if (layout === 'list') {
            return (
                <div className="p-grid" style={{padding: '2em', borderBottom: '1px solid #d9d9d9'}}>
                    <div className="p-col-12 p-md-3">
                        <img src={src} alt={contacto.nombre}/>
                    </div>
                    <div className="p-col-12 p-md-8 car-details">
                        <div className="p-grid">
                            <div className="p-col-2 p-sm-6">Nombre:</div>
                            <div className="p-col-10 p-sm-6">{contacto.nombre}</div>

                            <div className="p-col-2 p-sm-6">Email:</div>
                            <div className="p-col-10 p-sm-6">{contacto.email}</div>
                            <div className="p-col-2 p-sm-6">Teléfono:</div>
                            <div className="p-col-10 p-sm-6">{contacto.numTelefono}</div>

                            <div className="p-col-2 p-sm-6">Dirección:</div>
                            <div className="p-col-10 p-sm-6">{contacto.direccion}</div>

                            <div className="p-col-2 p-sm-6">Observaciones:</div>
                            <div className="p-col-10 p-sm-6">{contacto.color}</div>
                        </div>
                    </div>

                    <div className="p-col-12 p-md-1 search-icon" style={{marginTop:'40px'}}>
                        <Button icon="pi pi-search"></Button>
                    </div>
                </div>
            );
        }

        if (layout === 'grid') {
            return (
                <div style={{ padding: '.5em' }} className="p-col-12 p-md-3">
                    <Panel header={contacto.email} style={{ textAlign: 'center' }}>
                        <img src="assets/layout/images/avatar_2.png" alt={contacto.nombre} />
                        <div className="car-detail">{contacto.nombre} - {contacto.numTelefono}</div>
                        <Button icon="pi pi-search"></Button>
                    </Panel>
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
        let value = event.target.value;
       
         this.setState({sortOrder: 0, sortField:value, sortKey: value});
    }
    render() {


        const header = (
            <div className="p-grid">
                <div className="p-col-12 p-md-4" style={{textAlign:'left'}}>
                    <Dropdown options={this.state.sortOptions} value={this.state.sortKey} placeholder="Ordenar por" onChange={this.onSortChange} />
                </div>
                <div className="p-col-6 p-md-4">
                    <InputText placeholder="Buscar por nombre" onKeyUp={event => 
                        //this.dv
                        console.info(this.dv)
                        }/>
                </div>
                <div className="p-col-6 p-md-4" style={{textAlign: 'right'}}>
                    <DataViewLayoutOptions layout={this.state.layout} onChange={event => this.setState({layout: event.value})} />
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
                <DataView ref={el => this.dv = el} value={this.state.dataViewValue} filterBy="nombre" itemTemplate={this.dataViewItemTemplate} layout={this.state.layout}
                          paginatorPosition={'both'} paginator={true} rows={5} header={header} sortOrder={this.state.sortOrder} sortField={this.state.sortField}/>
            </div>
        </div>
        </div>
            
        );
    }
}