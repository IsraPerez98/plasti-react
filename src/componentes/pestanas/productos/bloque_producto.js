import React, {Component} from 'react';

import DialogoEliminarProducto from './dialogo_eliminar_producto';

class BloqueProducto extends Component { // los bloques que componen cada producto
    render() {

        const datos_producto = this.props.datos_producto;

        
        let datos_lista = [];

        for ( const indice in datos_producto ) {
            if(indice === "__v") continue; // weas de mongodb xd
            if(indice === "_id") continue; // no vamos a mostrar el id tampoco


            datos_lista.push(
                <li key={indice}>
                    {indice}:  {datos_producto[indice]}
                </li>
            )
        }


        return (
            <div>
                <ol>
                    {datos_lista}
                    <DialogoEliminarProducto
                        ObtenerJWTAcceso={this.props.ObtenerJWTAcceso}
                        recargarDatos={this.props.recargarDatos}
                        datos_producto={datos_producto}

                    />
                </ol>
            </div>
        );
    }
}

export default BloqueProducto;