import React, {Component} from 'react';
import DialogoEliminarCliente from './dialogo_eliminar_cliente';

class BloqueCliente extends Component { // los bloques que componen cada cliente
    render() {

        const datos_persona = this.props.datos_persona;

        return (
            <div className="div-datos-clientes">
                <ol className="datos-clientes">
                    <li>{datos_persona.rut}</li>
                    <li>{datos_persona.nombre}</li>
                    <li>{datos_persona.telefono}</li>
                    <li>{datos_persona.email}</li>
                    <li>{datos_persona.direccion}</li>
                    <li>{datos_persona.local}</li>
                <DialogoEliminarCliente
                    datos_cliente = {datos_persona}
                    ObtenerJWTAcceso={this.props.ObtenerJWTAcceso}
                    recargarDatos={this.props.recargarDatos}
                />
                </ol>
            </div>
        );
    }
}

export default BloqueCliente;