import React, {Component} from 'react';
import Collapsible from 'react-collapsible';

import InfoProductoPlegable from './info_producto_plegable';

class RegistroCompraPlegable extends Component {
    // se le pasa this.props.registro_compra

    constructor(props) {
        super(props);
    }

    render() {

        const registro_compra = this.props.registro_compra;

        const proveedor = registro_compra.compra.proveedor;
        
        const fecha = new Date( registro_compra.compra.fecha );
        const fecha_texto = fecha.toDateString();

        const info = registro_compra.info;

        let precio_total = 0; // este se calcula mas abajo sumando

        let productos_plegables = []; // en este arreglo se almacenan cada uno de los productos, como plegables igual

        for (let i=0; i<info.length; i++ ) { // por cada producto que incluya la compra, se transforma a un plegable
            const producto = info[i];

            productos_plegables.push(
                <li key={i}>
                    <InfoProductoPlegable
                        info={producto}
                    />
                </li>
            )

            precio_total = precio_total + parseInt(producto.precio);
        }


        return(
            <Collapsible className="registro-compra-plegable" 
                trigger={
                    <div className="registro-trigger">
                        Compra hecha el dia {fecha_texto} al proveedor {proveedor.nombre} ⌄
                    </div>
            }>
                <div className="registro-interior">
                    <ol>
                        <li>Fecha: {fecha_texto}</li>
                        <li>Proveedor: {proveedor.nombre}</li>
                        <li><ol className="productos-plegables">{productos_plegables}</ol></li>
                        <li>Precio Total: {precio_total}</li>
                    </ol>
                </div>
            </Collapsible>
        )
    }
}


export default RegistroCompraPlegable;