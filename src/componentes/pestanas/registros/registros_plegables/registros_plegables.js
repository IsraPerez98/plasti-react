import React, {Component} from 'react';

import RegistroVentaPlegable from './registro_venta_plegable';
import RegistroCompraPlegable from './registro_compra_plegable';

class RegistrosPlegables extends Component {
    //se le pasa this.props.registro_vende
    // y this.props.registro_compra

    constructor(props) {
        super(props);

        this.compararFechas = this.compararFechas.bind(this);
    }

    compararFechas(a,b) { // para ordenar los registros por fechas

        //esto es para setear la constante independientemente si es una venta o una compra
        const datos_a = a.vende ? a.vende : a.compra; 
        const datos_b = b.vende ? b.vende : b.compra;

        const fecha_a = new Date(datos_a.fecha);
        const fecha_b = new Date(datos_b.fecha);

        if(fecha_a > fecha_b) return -1;
        if(fecha_b < fecha_a) return 1;

        return 0;
    }

    render() {
        const registro_vende = this.props.registro_vende;
        const registro_compra = this.props.registro_compra;


        // en este arreglo tendremos los registros de las ventas y las compras juntos
        let registros_combinados = registro_vende.concat(registro_compra);

        //ordenamos por fecha
        registros_combinados = registros_combinados.sort(this.compararFechas);

        //console.log({registros_combinados});

        //este arreglo contendra todos los plegables de las transacciones
        let plegables_transacciones = [];

        // por cada registro de venta que envie la api, lo transformamos en un plegable
        for ( const [indice, transaccion] of registros_combinados.entries() ) {
            if(transaccion.vende) { // una venta
                plegables_transacciones.push(
                    < RegistroVentaPlegable 
                        key={indice}
                        registro_venta={transaccion}
                    />
                )
            } else { // una compra
                plegables_transacciones.push (
                    < RegistroCompraPlegable
                        key={indice}
                        registro_compra={transaccion}
                    />
                )
            }
            
        }
        
        return(
            <div className="registros-plegables">
                {plegables_transacciones}
            </div>
        )
    }
}


export default RegistrosPlegables;