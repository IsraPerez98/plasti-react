import React, {Component} from 'react';
import Collapsible from 'react-collapsible';

import InfoProductoPlegable from './info_producto_plegable';

class RegistroVentaPlegable extends Component {
    // se le pasa this.props.registro_venta

    constructor(props) {
        super(props);
    }

    render() {

        const registro_venta = this.props.registro_venta;

        const cliente = registro_venta.vende.cliente;
        
        const fecha = new Date( registro_venta.vende.fecha );
        const fecha_texto = fecha.toDateString();

        const info = registro_venta.info;

        let precio_total = 0; // este se calcula mas abajo sumando

        let productos_plegables = []; // en este arreglo se almacenan cada uno de los productos, como plegables igual

        for (let i=0; i<info.length; i++ ) { // por cada producto que incluya la venta, se transforma a un plegable
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
            <Collapsible trigger={`Venta hecha el dia ${fecha_texto} al cliente ${cliente.nombre} `}>
                <ol>
                    <li>Fecha: {fecha_texto}</li>
                    <li>Cliente: {cliente.nombre}</li>
                    <li><ol>{productos_plegables}</ol></li>
                    <li>Precio Total: {precio_total}</li>
                </ol>
            </Collapsible>
        )
    }
}


export default RegistroVentaPlegable;