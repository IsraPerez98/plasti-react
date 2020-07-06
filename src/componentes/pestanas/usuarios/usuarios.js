import React, {Component} from 'react';
import axios from 'axios';

import BloqueUsuario from './bloque_usuario';
import DialogoNuevoUsuario from './dialogo_nuevo_usuario';

class Usuarios extends Component {
    // se le pasa this.props.ObtenerJWTAcceso()
    // y this.props.EstaLogeado()
    // y this.props.ObtenerJWTAcceso()
    // y this.props.estaLogeado()

    constructor(props) {
        super(props);

        this.state = {
            cargado: false,
            error: null,
            datos_usuarios: {}, // aqui almacenamos los datos de los usuarios cuando se llama a la api

        };

        this.obtenerUsuariosAPI = this.obtenerUsuariosAPI.bind(this);
    }

    async obtenerUsuariosAPI() {
        this.setState({ // mientras no se obtienen los datos, dejamos el state como no cargado
            cargado: false,
            error: null,
        })

        const jwt_acceso = await this.props.ObtenerJWTAcceso(); 

        axios.get('/api/get/usuarios', { // llamamos a la api pidiendo los clientes
            headers: {
                "Authorization" : `Bearer ${jwt_acceso}`,
            }
        })
        .then( res => {
            const usuarios = res.data;
            
            this.setState({ // seteamos el estado del componente con los datos de la api
                cargado: true,
                datos_usuarios: usuarios,
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

    componentDidMount() {
        //llamamos a la api cuando se monte el componente
        this.obtenerUsuariosAPI();

    }

    render() {
        const esta_logeado = this.props.estaLogeado();
        const cargado = this.state.cargado;
        const error = this.state.error;
        const usuarios = this.state.datos_usuarios;

        //console.log("error: ", error);
        
        if(error) return( <div> ERROR {error} </div> );
        if(!(esta_logeado)) return( <div> Debe ingresar con su cuenta para acceder a este panel. </div> );
        if(!(cargado)) return( <div> Cargando... </div> );

        //aqui almacenaremos el componente con la info de cada usuario
        let componentes_usuarios = []; 

        for(const [indice, usuario] of usuarios.entries()) {
            componentes_usuarios.push(
                <BloqueUsuario
                    recargarDatos={this.obtenerUsuariosAPI}
                    datos_usuario={usuario}
                    ObtenerJWTAcceso={this.props.ObtenerJWTAcceso}
                />
            )
        }

        return(
            <div>
                <DialogoNuevoUsuario
                    ObtenerJWTAcceso={this.props.ObtenerJWTAcceso}
                    recargarDatos={this.obtenerUsuariosAPI}
                />
                {componentes_usuarios}
            </div>
        )
    }
}

export default Usuarios;