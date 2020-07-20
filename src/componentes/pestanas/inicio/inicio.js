import React, {Component} from 'react';
import axios from 'axios';

import Alertas from './alertas';

import '../../../sass/pestanas/inicio.scss';

class Inicio extends Component {
    // se le pasa this.props.ObtenerJWTAcceso

    constructor(props) {
        super(props);

        this.state = {
            cargado: false,
            error: null,
            datos_productos: {}, // aqui almacenamos los datos de los productos cuando se llama a la api

        };

        this.obtenerProductosAPI = this.obtenerProductosAPI.bind(this);
    }

    async obtenerProductosAPI() { //llamamos a la api y refrescamos los valores

        this.setState({ // mientras se llama a la api se deja como cargando
            cargado: false,
            error: null,
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
            console.log(productos);
            this.setState({ // seteamos el estado del componente con los datos de la api
                cargado: true,
                datos_productos: productos,
            });
        })
        .catch( (error, res) => { // algun error
            this.setState({
                cargado: true,
                error: JSON.stringify(error), // para que el error siempre se pase como texto
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
    }

    render () {

        const cargado = this.state.cargado;
        const error = this.state.error;
        const datos_productos = this.state.datos_productos;

        return(
            <div className="pestaña-inicio">
                <div className="parte-superior">
                    <label className="titulo"><h1>Inicio</h1></label>
                </div>
                <Alertas
                    datos_productos={datos_productos}
                />
                
            </div>
        )
    }
}


export default Inicio;