import React, {Component} from 'react';
import DialogoEliminarCliente from './dialogo_eliminar_cliente';

class BloqueCliente extends Component { // los bloques que componen cada cliente
    render() {

        const datos_persona = this.props.datos_persona;

        let datos_lista = [];

        for ( const indice in datos_persona ) {
            if(indice === "__v") continue; // weas de mongodb xd
            if(indice === "_id") continue; // no vamos a mostrar el id tampoco

            datos_lista.push(
                <li key={indice}>
                    {indice}:  {datos_persona[indice]}
                </li>
            )
        }

        return (
            <div>
                <ol>
                {datos_lista}
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