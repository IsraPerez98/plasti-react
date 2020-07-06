import React, {Component} from 'react';

import DialogoEliminarUsuario from './dialogo_eliminar_usuario';

class BloqueUsuario extends Component {
    // se le pasa this.props.recargarDatos()
    // y this.props.datos_usuario
    // y this.props.ObtenerJWTAcceso()
    
    render() {
        const datos_usuario = this.props.datos_usuario;

        let datos_lista = [];

        for ( const indice in datos_usuario ) {
            if(indice === "__v") continue; // weas de mongodb xd
            if(indice === "_id") continue; // no vamos a mostrar el id tampoco

            datos_lista.push(
                <li key={indice}>
                    {indice}:  {datos_usuario[indice]}
                </li>
            )
        }
        return(
            <div>
                <ol>
                    {datos_lista}
                    <DialogoEliminarUsuario
                        ObtenerJWTAcceso={this.props.ObtenerJWTAcceso}
                        recargarDatos={this.props.recargarDatos}
                        datos_usuario={this.props.datos_usuario}
                    
                    />
                </ol>
            </div>
        )
    }
}

export default BloqueUsuario;