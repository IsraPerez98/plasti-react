import React, {Component} from 'react';
import axios from 'axios';

import BloqueCliente from './bloque_cliente';
import DialogoNuevoCliente from './dialogo_nuevo_cliente';

class Clientes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cargado: false,
            error: null,
            datos_clientes: {}, // aqui almacenamos los datos de los clientes cuando se llama a la api

            busqueda: "", // el string de busqueda
        };

        this.obtenerClientesAPI = this.obtenerClientesAPI.bind(this);
        this.actualizar_estado = this.actualizar_estado.bind(this);
        
    }

    async obtenerClientesAPI() { //llamamos a la api y refrescamos los valores

        this.setState({ // mientras no se obtienen los datos, dejamos el state como no cargado
            cargado: false,
            error: null,
        })

        const jwt_acceso = await this.props.ObtenerJWTAcceso(); 
        
        axios.get('/api/get/clientes', { // llamamos a la api pidiendo los clientes
            headers: {
                "Authorization" : `Bearer ${jwt_acceso}`,
            }
        })
        .then( res => {
            const clientes = res.data;
            
            //console.log(clientes);
            this.setState({ // seteamos el estado del componente con los datos de la api
                cargado: true,
                datos_clientes: clientes,
            });
        })
        .catch( (error, res) => { // algun error
            this.setState({
                cargado: true,
                error: JSON.stringify(error), // para que el error siempre se pase como texto
            });
            console.log(error);
            console.log(error.response);
            if("response" in error ) {
                if("data" in error.response){
                    alert(error.response.data);
                } 
            }else {
                alert("Error Desconocido");
            }
            
        } )
    }

    componentDidMount() { // cuando se monte el componenete llamamos a la api
        this.obtenerClientesAPI();
    }

    actualizar_estado(e) {
        this.setState({
            [e.target.name]: e.target.value , // actualizamos el state del componente con los datos que ingrese el usuario
        });
    }

    render() {
        const esta_logeado = this.props.estaLogeado();
        const cargado = this.state.cargado;
        const error = this.state.error;
        const clientes = this.state.datos_clientes;

        //console.log("error: ", error);
        
        if(error) return( <div> ERROR {error} </div> );
        if(!(esta_logeado)) return( <div> Debe ingresar con su cuenta para acceder a este panel. </div> );
        if(!(cargado)) return( <div> Cargando... </div> );

        let componentes_clientes = [];

        for ( const [indice, cliente] of clientes.entries() ) {
            let mostrar = false;

            const str_busqueda = this.state.busqueda.toLowerCase();

            if(!(str_busqueda)) {
                mostrar = true; // si no se esta buscando nada
            } else {
                if(cliente.rut && cliente.rut.toLowerCase().includes(str_busqueda)) mostrar = true;
                if(cliente.nombre && cliente.nombre.toLowerCase().includes(str_busqueda)) mostrar = true;
                if(cliente.email && cliente.email.toLowerCase().includes(str_busqueda)) mostrar = true;
                if(cliente.direccion && cliente.direccion.toLowerCase().includes(str_busqueda)) mostrar = true;
                if(cliente.local && cliente.local.toLowerCase().includes(str_busqueda)) mostrar = true;
            }
            

            if(mostrar){
                componentes_clientes.push(<li key={indice}><BloqueCliente
                    ObtenerJWTAcceso={this.props.ObtenerJWTAcceso}
                    obtenerClientesAPI={this.obtenerClientesAPI}
                    datos_cliente={cliente}
                /></li>)
            }
        } 

        return(
            <div>
                <label><h1>Clientes</h1></label>
                <div>
                    <DialogoNuevoCliente
                        ObtenerJWTAcceso={this.props.ObtenerJWTAcceso}
                        obtenerClientesAPI={this.obtenerClientesAPI}
                    />
                </div>
                <div>
                    <label>Busqueda:</label>
                    <input type="text" id="busqueda" name="busqueda" value={this.state.busqueda} onChange={e => this.actualizar_estado(e)} />
                </div>
                {componentes_clientes}
            </div>
        );
    }
}

export default Clientes;