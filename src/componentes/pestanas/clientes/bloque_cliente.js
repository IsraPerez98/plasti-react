import React, {Component} from 'react';
import DialogoEliminarCliente from './dialogo_eliminar_cliente';

class BloqueCliente extends Component { // los bloques que componen cada cliente
    render() {
        const datos_cliente = this.props.datos_cliente;
        const id = datos_cliente._id;
        const rut = datos_cliente.rut;
        const nombre = datos_cliente.nombre;
        const telefono = datos_cliente.telefono;
        const email = datos_cliente.email; 
        const direccion = datos_cliente.direccion;
        const local = datos_cliente.local;

        return (
            <div>
                <ol>
                <li>{id}</li>
                <li>{rut}</li>
                <li>{nombre}</li>
                <li>{telefono}</li>
                <li>{email}</li>
                <li>{direccion}</li>
                <li>{local}</li>
                <DialogoEliminarCliente 
                    datos_cliente = {datos_cliente}
                    ObtenerJWTAcceso={this.props.ObtenerJWTAcceso}
                    obtenerClientesAPI={this.props.obtenerClientesAPI}
                />
                </ol>
            </div>
        );
    }
}

export default BloqueCliente;