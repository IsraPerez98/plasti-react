import React, {Component} from 'react';
import axios from 'axios';
//import ReactModal from 'react-modal';

import DialogoEliminar from '../../dialogo_eliminar';

class DialogoEliminarProveedor extends Component {
    //se le pasa this.props.obtenerJWTAcceso
    // this.props.recargarDatos para recargar los datos de los proveedores una vez borrado
    // this.props.datos_proveedor que tiene los datos del proveedor

    constructor(props) {
        super(props);

        this.eliminarProveedor = this.eliminarProveedor.bind(this);
    }

    async eliminarProveedor() {
    
        const jwt_acceso = await this.props.ObtenerJWTAcceso();
    
        axios.delete('/api/delete/proveedor/', { // llamamos a la api
            data: { 
                proveedor: this.props.datos_proveedor._id,
            },
            
            headers: {
                "Authorization" : `Bearer ${jwt_acceso}`,
            }
        })
        .then( res => {
            console.log(res.data);

            //recargamos los datos correspondiente a las personas
            this.props.recargarDatos();
            
            alert("El proveedor se ha eliminado de forma exitosa.");
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

        const datos_proveedor = this.props.datos_proveedor;

        return (
            <DialogoEliminar
                funcionEliminar={this.eliminarProveedor}
                windowConfirm={`Desea eliminar al proveedor:\n${datos_proveedor._id}\n${datos_proveedor.rut} \n${datos_proveedor.nombre}`}
            />
        )
    }
}

export default DialogoEliminarProveedor;