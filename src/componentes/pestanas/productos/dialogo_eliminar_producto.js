import React, {Component} from 'react';
import axios from 'axios';
//import ReactModal from 'react-modal';

import DialogoEliminar from '../../dialogo_eliminar';

class DialogoEliminarProducto extends Component {
    //se le pasa this.props.obtenerJWTAcceso
    // this.props.recargarDatos para recargar los datos de los productos una vez borrado
    // this.props.datos_producto que tiene los datos del producto

    constructor(props){
        super(props);

        this.eliminarProducto = this.eliminarProducto.bind(this);
    }

    async eliminarProducto() {
    
        const jwt_acceso = await this.props.ObtenerJWTAcceso();
    
        axios.delete('/api/delete/producto/', { // llamamos a la api
            data: { 
                producto: this.props.datos_producto._id,
            },
            
            headers: {
                "Authorization" : `Bearer ${jwt_acceso}`,
            }
        })
        .then( res => {
            console.log(res.data);

            this.props.recargarDatos();
            
            alert("El producto se ha eliminado de forma exitosa.");
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

        const datos_producto = this.props.datos_producto;

        return (
            <DialogoEliminar
                funcionEliminar={this.eliminarProducto}
                windowConfirm={`Desea eliminar el producto:\n${datos_producto.nombre}`}
            />
        )
    }
}

export default DialogoEliminarProducto;