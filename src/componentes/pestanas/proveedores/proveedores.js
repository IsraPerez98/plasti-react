import React, {Component} from 'react';
import axios from 'axios';

import BloqueProveedor from './bloque_proveedor';
import DialogoNuevoProveedor from './dialogo_nuevo_proveedor';

class Proveedores extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cargado: false,
            error: null,
            datos_proveedores: {}, // aqui almacenamos los datos de los proveedores cuando se llama a la api

            busqueda: "", // el string de busqueda
        };

        this.obtenerProveedoresAPI = this.obtenerProveedoresAPI.bind(this);
        this.actualizarEstado = this.actualizarEstado.bind(this);
        
    }

    async obtenerProveedoresAPI() { //llamamos a la api y refrescamos los valores

        this.setState({ // mientras no se obtienen los datos, dejamos el state como no cargado
            cargado: false,
            error: null,
        })

        const jwt_acceso = await this.props.ObtenerJWTAcceso(); 
        
        axios.get('/api/get/proveedores', { // llamamos a la api pidiendo los clientes
            headers: {
                "Authorization" : `Bearer ${jwt_acceso}`,
            }
        })
        .then( res => {
            const proveedores = res.data;
            
            //console.log(clientes);
            this.setState({ // seteamos el estado del componente con los datos de la api
                cargado: true,
                datos_proveedores: proveedores,
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
        this.obtenerProveedoresAPI();
    }

    actualizarEstado(e) {
        this.setState({
            [e.target.name]: e.target.value , // actualizamos el state del componente con los datos que ingrese el usuario
        });
    }

    render() {
        const esta_logeado = this.props.estaLogeado();
        const cargado = this.state.cargado;
        const error = this.state.error;
        const proveedores = this.state.datos_proveedores;

        //console.log("error: ", error);
        
        if(error) return( <div> ERROR {error} </div> );
        if(!(esta_logeado)) return( <div> Debe ingresar con su cuenta para acceder a este panel. </div> );
        if(!(cargado)) return( <div> Cargando... </div> );

        let componentes_proveedores = [];

        for ( const [indice, proveedor] of proveedores.entries() ) {
            let mostrar = false;

            const str_busqueda = this.state.busqueda.toLowerCase();

            if(!(str_busqueda)) {
                mostrar = true; // si no se esta buscando nada
            } else {
                if(proveedor.rut && proveedor.rut.toLowerCase().includes(str_busqueda)) mostrar = true;
                else if(proveedor.nombre && proveedor.nombre.toLowerCase().includes(str_busqueda)) mostrar = true;
                else if(proveedor.email && proveedor.email.toLowerCase().includes(str_busqueda)) mostrar = true;
                else if(proveedor.direccion && proveedor.direccion.toLowerCase().includes(str_busqueda)) mostrar = true;
                else if(proveedor.pagina_web && proveedor.pagina_web.toLowerCase().includes(str_busqueda)) mostrar = true;
            }
            

            if(mostrar){
                componentes_proveedores.push(<li key={indice}><BloqueProveedor
                    ObtenerJWTAcceso={this.props.ObtenerJWTAcceso}
                    recargarDatos={this.obtenerProveedoresAPI}
                    datos_persona={proveedor}
                    tipo_persona={"proveedor"}
                /></li>)
            }
        } 

        return(
            <div>
                <label><h1>Proveedores</h1></label>
                <div>
                    <DialogoNuevoProveedor
                        ObtenerJWTAcceso={this.props.ObtenerJWTAcceso}
                        obtenerProveedoresAPI={this.obtenerProveedoresAPI}
                    />
                </div>
                <div>
                    <label>Busqueda:</label>
                    <input type="text" id="busqueda" name="busqueda" value={this.state.busqueda} onChange={e => this.actualizarEstado(e)} />
                </div>
                {componentes_proveedores}
            </div>
        );
    }
}

export default Proveedores;