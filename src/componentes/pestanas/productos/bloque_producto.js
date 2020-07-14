import React, {Component} from 'react';

import DialogoEliminarProducto from './dialogo_eliminar_producto';

class BloqueProducto extends Component { // los bloques que componen cada producto
    render() {

        const datos_producto = this.props.datos_producto;


        return (
            <div className="div-datos-productos">
                <ol className="datos-productos">
                    <li>{datos_producto.nombre}</li>
                    <li>{datos_producto.material}</li>
                    <li>{datos_producto.precio_venta}</li>
                    <li>{datos_producto.contenido}</li>
                    <li>{datos_producto.unidad_medida}</li>
                    <li>{datos_producto.cantidad}</li>
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