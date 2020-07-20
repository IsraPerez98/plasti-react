import React, {Component} from 'react';

class BloqueStockBajo extends Component { // los bloques que componen cada producto con stock bajo
    // se le pasa this.props.producto

    render() {
        const producto = this.props.producto;
        return(
            <div className="div-producto-stock-bajo">
                <ol className="datos-producto">
                    <li>{`${producto.nombre} ${producto.contenido} ${producto.unidad_medida}`}</li>
                    <li>{producto.cantidad} un</li>
                </ol>
            </div>
        )
    }
}

export default BloqueStockBajo;