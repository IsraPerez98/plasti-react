import React, {Component} from 'react';

import BloqueStockBajo from './bloque_stock_bajo';

class Alertas extends Component {
    // se le pasa this.props.datos_productos

    constructor(props) {
        super(props);
        this.state = {
            //los productos con cantidad <= esta variable, se consideran como stock bajo
            //TODO: hacer que esto lo modifique el usuario
            stock_bajo: 5,
        }
    }

    render() {

        const productos = this.props.datos_productos;

        //console.log({productos});

        let produtos_bajo_stock = [];

        for(const indice in productos) {
            const producto = productos[indice];
            console.log("cant", producto.cantidad <= this.state.stock_bajo);
            if(producto.cantidad <= this.state.stock_bajo)  {
                //stock bajo de este producto
                produtos_bajo_stock.push(
                    <li key={indice}>
                        <BloqueStockBajo
                            producto={producto}
                        />
                    </li>
                )
            }
        }

        if(produtos_bajo_stock.length === 0) {
            // si no hay productos con bajo stock, no dibujamos nada
            return(
                <div className="div-alertas">
                
                </div>
            )
        }

        return(
            <div className="div-alertas">
                <label className="titulo-alertas">Alertas</label>
                <div className="div-stock-bajo">
                    <label className="titulo-stock-bajo">Productos Con Stock Bajo:</label>
                    <ol className="titulos-cuadriculas-productos">
                        <li>Producto</li>
                        <li>Existencias</li>
                    </ol>
                    <ol className="lista-productos">
                        {produtos_bajo_stock}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Alertas;