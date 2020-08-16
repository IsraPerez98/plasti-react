import React, {Component} from 'react';
import axios from 'axios';

import RegistroVentaPlegable from './registro_venta_plegable';
import RegistroCompraPlegable from './registro_compra_plegable';

class RegistrosPlegables extends Component {
    // se le pasa this.props.ObtenerJWTAcceso()

    constructor(props) {
        super(props);

        this.state = {
            registro_vende: {
                cargado: false, // si se han cargado los registros de las ventas
                error: null,
                datos: {}, // donde almacenamos los registros de las ventas
            },
            registro_compra: {
                cargado: false, // si se han cargado los registros de las compras
                error: null,
                datos: {}, // donde almacenamos los registros de las compras
            }
        }

        this.obtenerRegistrosVentas = this.obtenerRegistrosVentas.bind(this);
        this.obtenerRegistrosCompras = this.obtenerRegistrosCompras.bind(this);
        this.compararFechas = this.compararFechas.bind(this);
    }

    async obtenerRegistrosVentas() {
        const jwt_acceso = await this.props.ObtenerJWTAcceso(); 
        
        axios.get('/api/get/registrosventas', { // llamamos a la api pidiendo los registros de las ventas
            headers: {
                "Authorization" : `Bearer ${jwt_acceso}`,
            }
        })
        .then( res => {
            const registro_vende = res.data;
            
            //console.log(registro_vende);
            this.setState({ // seteamos el estado del componente con los datos de la api
                registro_vende: {
                    cargado: true,
                    datos: registro_vende,
                },
            });
        })
        .catch( (error, res) => { // algun error
            this.setState({
                registro_vende : {
                    cargado: true,
                    error: JSON.stringify(error), // para que el error siempre se pase como texto
                },
            });
            console.log(error);
            console.log(error.response);
            if("response" in error ) {
                if("data" in error.response){
                    alert(error.response.data);
                } 
            }else {
                alert("Error Desconocido");
            }
            
        } )
    }

    async obtenerRegistrosCompras() {
        const jwt_acceso = await this.props.ObtenerJWTAcceso(); 
        
        axios.get('/api/get/registroscompras', { // llamamos a la api pidiendo los registros de las compras
            headers: {
                "Authorization" : `Bearer ${jwt_acceso}`,
            }
        })
        .then( res => {
            const registro_compra = res.data;
            
            //console.log(registro_compra);
            this.setState({ // seteamos el estado del componente con los datos de la api
                registro_compra: {
                    cargado: true,
                    datos: registro_compra,
                },
            });
        })
        .catch( (error, res) => { // algun error
            this.setState({
                registro_vende : {
                    cargado: true,
                    error: JSON.stringify(error), // para que el error siempre se pase como texto
                },
            });
            console.log(error);
            console.log(error.response);
            if("response" in error ) {
                if("data" in error.response){
                    alert(error.response.data);
                } 
            }else {
                alert("Error Desconocido");
            }
            
        } )
    }

    componentDidMount() {
        //obtenemos los datos desde la API cuando el componente se monte
        this.obtenerRegistrosVentas();
        this.obtenerRegistrosCompras();
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
        const cargado = this.state.registro_compra.cargado && this.state.registro_vende.cargado;
        const error = this.state.registro_compra.error || this.state.registro_vende.error;
        const registro_vende = this.state.registro_vende.datos;
        const registro_compra = this.state.registro_compra.datos;
 
        if(error) return <div> ERROR: {error} </div>;
        if(!cargado) return <div> Cargando .... </div>;

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