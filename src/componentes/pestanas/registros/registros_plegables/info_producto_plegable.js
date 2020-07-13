import React, {Component} from 'react';
import Collapsible from 'react-collapsible';


class InfoProductoPlegable extends Component {
    // se le pasa this.props.info
    // que contiene info.producto
    // info.cantidad
    // y info.precio

    constructor(props) {
        super(props);
    }

    render() {
        const info = this.props.info;
        const producto = info.producto;


        return(
            <Collapsible trigger={`Producto: ${producto.nombre} `}>
                <ol>
                    <li>Nombre: {producto.nombre}</li>
                    <li>Cantidad Vendida: {info.cantidad}</li>
                    <li>Precio: {info.precio}</li>
                </ol>
            </Collapsible>
        )
    }
}


export default InfoProductoPlegable;