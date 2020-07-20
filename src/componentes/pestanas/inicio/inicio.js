import React, {Component} from 'react';
import axios from 'axios';

import Alertas from './alertas';
import GraficoVentas from './grafico_ventas';

import '../../../sass/pestanas/inicio.scss';

class Inicio extends Component {
    // se le pasa this.props.ObtenerJWTAcceso

    constructor(props) {
        super(props);

        this.state = {
            productos: {
                cargado: false,
                error: null,
                datos: {},
            },
            registro_vende: {
                cargado: false,
                error: null,
                datos: {},
            }
        };

        this.obtenerProductosAPI = this.obtenerProductosAPI.bind(this);
        this.obtenerRegistrosVentas = this.obtenerRegistrosVentas.bind(this);
    }

    async obtenerProductosAPI() { //llamamos a la api y refrescamos los valores

        this.setState({ // mientras se llama a la api se deja como cargando
            productos: {
                cargado: false,
                error: null,
            },
        })

        const jwt_acceso = await this.props.ObtenerJWTAcceso(); 

        //console.log("jwt productos ", jwt_acceso);
        
        axios.get('/api/get/productos', { // llamamos a la api pidiendo los productos
            headers: {
                "Authorization" : `Bearer ${jwt_acceso}`,
            }
        })
        .then( res => {
            const productos = res.data;
            //const productos = JSON.parse(res.data);

            this.setState({ // seteamos el estado del componente con los datos de la api
                productos: {
                    cargado: true,
                    error: null,
                    datos: productos,
                },
            });
        })
        .catch( (error, res) => { // algun error
            this.setState({
                productos: {
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

    componentDidMount() { // cuando se monte el componenete llamamos a la api
        this.obtenerProductosAPI();
        this.obtenerRegistrosVentas();
    }

    render () {

        const cargado = this.state.productos.cargado && this.state.registro_vende.cargado;
        const error = this.state.productos.error || this.state.registro_vende.error;

        if(error) return <div> ERROR: {error} </div>;
        if(!cargado) return <div> Cargando .... </div>;

        const datos_productos = this.state.productos.datos;
        const registro_vende = this.state.registro_vende.datos;

        return(
            <div className="pestaña-inicio">
                <div className="parte-superior">
                    <label className="titulo"><h1>Inicio</h1></label>
                </div>
                <Alertas
                    datos_productos={datos_productos}
                />
                <GraficoVentas
                    registro_vende={registro_vende}
                />
                
            </div>
        )
    }
}


export default Inicio;