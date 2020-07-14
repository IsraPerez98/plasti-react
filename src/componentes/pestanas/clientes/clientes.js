import React, {Component} from 'react';
import axios from 'axios';

import BloqueCliente from './bloque_cliente';
import DialogoNuevoCliente from './dialogo_nuevo_cliente';

import '../../../sass/pestanas/clientes.scss';

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
        const cargado = this.state.cargado;
        const error = this.state.error;
        const clientes = this.state.datos_clientes;

        //console.log("error: ", error);
        
        if(error) return( <div> ERROR {error} </div> );
        if(!(cargado)) return( <div> Cargando... </div> );

        let componentes_clientes = [];

        for ( const [indice, cliente] of clientes.entries() ) {
            let mostrar = false;

            const str_busqueda = this.state.busqueda.toLowerCase();

            if(!(str_busqueda)) {
                mostrar = true; // si no se esta buscando nada
            } else {
                if(
                    (cliente.rut && cliente.rut.toLowerCase().includes(str_busqueda)) ||
                    (cliente.nombre && cliente.nombre.toLowerCase().includes(str_busqueda)) ||
                    (cliente.email && cliente.email.toLowerCase().includes(str_busqueda)) ||
                    (cliente.direccion && cliente.direccion.toLowerCase().includes(str_busqueda)) ||
                    (cliente.local && cliente.local.toLowerCase().includes(str_busqueda))
                ) {
                    mostrar = true;
                }
            }
            

            if(mostrar){
                componentes_clientes.push(<li key={indice}><BloqueCliente
                    ObtenerJWTAcceso={this.props.ObtenerJWTAcceso}
                    recargarDatos={this.obtenerClientesAPI}
                    datos_persona={cliente}
                    tipo_persona="cliente"
                /></li>)
            }
        } 

        return(
            <div className="pestaña-clientes">
                <div className="parte-superior">
                    <label className="titulo"><h1>Clientes</h1></label>
                    <DialogoNuevoCliente
                        ObtenerJWTAcceso={this.props.ObtenerJWTAcceso}
                        recargarDatos={this.obtenerClientesAPI}
                    />
                    <input type="text" className="busqueda" id="busqueda" name="busqueda" placeholder="Buscar Cliente..." value={this.state.busqueda} onChange={e => this.actualizar_estado(e)} />
                </div>
                <div className="cuadricula-clientes">
                    <ol className="titulo-clientes">
                        {/*<li>Código</li>*/}
                        <li>RUT</li>
                        <li>Nombre</li>
                        <li>Telefono</li>
                        <li>Email</li>
                        <li>Direccion</li>
                        <li>Nombre del Local</li>
                        <li></li>
                    </ol>
                    {componentes_clientes}
                </div>
            </div>
        );
    }
}

export default Clientes;