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
            <Collapsible 
                trigger={
                <div className="trigger-producto">
                    Producto: {producto.nombre} - {producto.material} ⌄
                </div>
            }>
                <div className="producto-interior">
                    <ol>
                        <li>Nombre: {producto.nombre}</li>
                        <li>Material: {producto.material}</li>
                        <li>Cantidad Vendida: {info.cantidad}</li>
                        <li>Precio: {info.precio}</li>
                    </ol>
                </div>
            </Collapsible>
        )
    }
}


export default InfoProductoPlegable;