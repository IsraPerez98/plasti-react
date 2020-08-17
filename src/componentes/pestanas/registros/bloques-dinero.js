import React, {Component} from 'react';

const arreglo_meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
]

class BloquesDinero extends Component {
    // se le pasa this.props.registro_compra
    // y this.props.registro_venta

    render() {
        const registro_compra = this.props.registro_compra;
        const registro_vende = this.props.registro_vende;

        let dinero_venta_mes = 0;
        let dinero_venta_ano = 0;

        let dinero_compra_mes = 0;
        let dinero_compra_ano = 0;

        const date = new Date();
        const primer_dia_mes = new Date(date.getFullYear(), date.getMonth(), 1);
        const primer_dia_ano = new Date(date.getFullYear(), 1, 1);

        for(let i in registro_compra) {
            const compra = registro_compra[i];
            const fecha = new Date(compra.compra.fecha);

            //console.log(compra);
            //console.log(fecha);

            if( fecha >= (primer_dia_ano) ) { // un año

                let dinero_transaccion = 0;

                for(let j in compra.info) { // por cada producto en la compra
                    const producto = compra.info[j];

                    dinero_transaccion += producto.precio;
                }

                dinero_compra_ano += dinero_transaccion;

                if( fecha >= (primer_dia_mes) ) { // un mes
                    dinero_compra_mes += dinero_transaccion;
                }

            }
        
        }

        for(let i in registro_vende) {
            const venta = registro_vende[i];
            console.log(venta);
            const fecha = new Date(venta.vende.fecha);


            if( fecha >= (primer_dia_ano) ) { // un año

                let dinero_transaccion = 0;

                for(let j in venta.info) { // por cada producto en la benta
                    const producto = venta.info[j];

                    dinero_transaccion += producto.precio;
                }

                dinero_venta_ano += dinero_transaccion;

                if( fecha >= (primer_dia_mes) ) { // un mes
                    dinero_venta_mes += dinero_transaccion;
                }

            }
        
        }

        return(
            

            <div className="registros-dinero">
               <div className="cuadro-dinero-mes">
                   <label>Mes de {arreglo_meses[date.getMonth()]}</label>
                    <label>Ventas Totales del Mes: {dinero_venta_mes}</label>
                    <label>Compras Totales del Mes: {dinero_compra_mes}</label>
                    <label>Dinero Total Recaudado: {dinero_venta_mes - dinero_compra_mes}</label>
                </div> 
                <div className="cuadro-dinero-año">
                    <label>Año {date.getFullYear()}</label>
                    <label>Ventas Totales del Año: {dinero_venta_ano}</label>
                    <label>Compras Totales del Año: {dinero_compra_ano}</label>
                    <label>Dinero Total Recaudado: {dinero_venta_ano - dinero_compra_ano}</label>
                </div>
            </div>
        )
    }
}

export default BloquesDinero;