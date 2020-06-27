import React, {Component} from 'react';
import axios from 'axios';
//import ReactModal from 'react-modal';

class DialogoEliminarCliente extends Component {
    // se asume que this.props.datos_cliente tiene todos los datos respecto del cliente
    constructor(props) {
        super(props);

        this.abrirDialogoEliminar = this.abrirDialogoEliminar.bind(this);
    }

    async eliminarCliente(objectID_Cliente) {
        //console.log(objectID_Cliente);
    
        const jwt_acceso = await this.props.ObtenerJWTAcceso();

        console.log("eliminar cliente ", jwt_acceso);
    
        axios.delete('/api/delete/cliente/', { // llamamos a la api
            data: { 
                cliente: objectID_Cliente,
            },
            
            headers: {
                "Authorization" : `Bearer ${jwt_acceso}`,
            }
        })
        .then( res => {
            console.log(res.data);

            this.props.obtenerClientesAPI(); //recargamos el componente de los clientes
            
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

    abrirDialogoEliminar() {
        const datos_cliente = this.props.datos_cliente;
        if(window.confirm("Desea eliminar al cliente:\n" + datos_cliente._id + "\n" + datos_cliente.rut + " \n" + datos_cliente.nombre)) {
            this.eliminarCliente(datos_cliente._id);
        }
    }

    render() {

        return (
            <div>
                <button type="button" onClick={this.abrirDialogoEliminar}>Eliminar</button>
            </div>
        )
    }
}

export default DialogoEliminarCliente;