import React, {Component} from 'react';
import axios from 'axios';
//import ReactModal from 'react-modal';

import DialogoEliminar from '../../dialogo_eliminar';

class DialogoEliminarCliente extends Component {
    //se le pasa this.props.obtenerJWTAcceso
    // this.props.recargarDatos para recargar los datos de los clientes una vez borrado
    // this.props.datos_cliente que tiene los datos del cliente

    constructor(props) {
        super(props);

        this.eliminarCliente = this.eliminarCliente.bind(this);
    }

    async eliminarCliente() {
    
        const jwt_acceso = await this.props.ObtenerJWTAcceso();

        //console.log("eliminar cliente ", jwt_acceso);
    
        axios.delete('/api/delete/cliente/', { // llamamos a la api
            data: { 
                cliente: this.props.datos_cliente._id,
            },
            
            headers: {
                "Authorization" : `Bearer ${jwt_acceso}`,
            }
        })
        .then( res => {
            console.log(res.data);

            //recargamos los datos correspondiente a las personas
            this.props.recargarDatos();
            
            alert("El cliente se ha eliminado de forma exitosa.");
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

        const datos_cliente = this.props.datos_cliente;

        return (
            <DialogoEliminar
                funcionEliminar={this.eliminarCliente}
                windowConfirm={`Desea eliminar al cliente:\n${datos_cliente.rut}\n${datos_cliente.nombre}\n${datos_cliente.email}`}
            />
        )
    }
}

export default DialogoEliminarCliente;