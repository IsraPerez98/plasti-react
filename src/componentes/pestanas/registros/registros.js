import React, {Component} from 'react';
import axios from 'axios';

import RegistrosPlegables from './registros_plegables/registros_plegables';
import BloquesDinero from './bloques-dinero';

import '../../../sass/pestanas/registros.scss';

class Registro extends Component {
    // se le pasa this.props.ObtenerJWTAcceso

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

    render() {
        const cargado = this.state.registro_compra.cargado && this.state.registro_vende.cargado;
        const error = this.state.registro_compra.error || this.state.registro_vende.error;
        const registro_vende = this.state.registro_vende.datos;
        const registro_compra = this.state.registro_compra.datos;
 
        if(error) return <div> ERROR: {error} </div>;
        if(!cargado) return <div> Cargando .... </div>;


        return(
            <div className="pestaña-registros">
                <BloquesDinero
                    registro_compra={registro_compra}
                    registro_vende={registro_vende}
                />
                <RegistrosPlegables
                    registro_compra={registro_compra}
                    registro_vende={registro_vende}
                />
            </div>
        )
    }
}


export default Registro;