import React, {Component} from 'react';
import axios from 'axios';

import DialogoEliminar from '../../dialogo_eliminar';

class DialogoEliminarUsuario extends Component {
    //se le pasa this.props.obtenerJWTAcceso()
    // this.props.recargarDatos() para recargar los datos de los usuarios una vez borrado
    // this.props.datos_usuario que tiene los datos del usuario

    constructor(props) {
        super(props);

        this.eliminarUsuario = this.eliminarUsuario.bind(this);
    }

    async eliminarUsuario() {
        const jwt_acceso = await this.props.ObtenerJWTAcceso();
    
        axios.delete('/api/delete/usuario/', { // llamamos a la api
            data: { 
                usuario: this.props.datos_usuario._id,
            },
            
            headers: {
                "Authorization" : `Bearer ${jwt_acceso}`,
            }
        })
        .then( res => {
            console.log(res.data);

            //recargamos los datos correspondiente a los usuarios
            this.props.recargarDatos();
            
            alert("El usuario se ha eliminado de forma exitosa.");
        })
        .catch( (error, res) => { // algun error
            console.log(error);
            console.log(error.response);
            if("data" in error.response){
                alert(error.response.data);
            } else {
                alert("Error Desconocido");
            }
            
        } )
    }
    
    render() {

        const datos_usuario = this.props.datos_usuario;

        return (
            <DialogoEliminar
                funcionEliminar={this.eliminarUsuario}
                windowConfirm={`Desea eliminar al usuario:\n${datos_usuario._id}\n${datos_usuario.usuario} \n${datos_usuario.nombre}`}
            />
        )
    }
}

export default DialogoEliminarUsuario;