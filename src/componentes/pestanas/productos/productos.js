import React, {Component} from 'react';
import axios from 'axios';

import BloqueProducto from './bloque_producto';
import DialogoNuevoProducto from './dialogo_nuevo_producto';

import '../../../sass/pestanas/productos.scss';

class Productos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cargado: false,
            error: null,
            datos_productos: {}, // aqui almacenamos los datos de los productos cuando se llama a la api

            busqueda: "", // el string de busqueda
        };

        this.obtenerProductosAPI = this.obtenerProductosAPI.bind(this);
        this.actualizar_estado = this.actualizar_estado.bind(this);
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

    actualizar_estado(e) {
        this.setState({
            [e.target.name]: e.target.value , // actualizamos el state del componente con los datos que ingrese el usuario
        });
    }

    render() {
        const cargado = this.state.cargado;
        const error = this.state.error;
        const productos = this.state.datos_productos;
        
        if(error) return <div> ERROR {error} </div>;
        if(!cargado) return <div> Cargando... </div>;

        let componentes_productos = [];

        for ( const [indice, producto] of productos.entries() ) {
            let mostrar = false;

            const str_busqueda = this.state.busqueda.toLowerCase();

            if(!(str_busqueda)) {
                mostrar = true; // si no se esta buscando nada
            } else {
                if(
                    (producto.nombre && producto.nombre.toLowerCase().includes(str_busqueda)) ||
                    (producto.material && producto.material.toLowerCase().includes(str_busqueda)) ||
                    (producto.contenido && producto.contenido.toLowerCase().includes(str_busqueda)) ||
                    (producto.unidad_medida && producto.unidad_medida.toLowerCase().includes(str_busqueda))
                ) {
                    mostrar = true;
                }
            }
            

            if(mostrar){
                componentes_productos.push(<li key={indice}><BloqueProducto 
                    datos_producto={producto}

                    recargarDatos={this.obtenerProductosAPI}
                    ObtenerJWTAcceso={this.props.ObtenerJWTAcceso}
                /></li>)
            }
        } 

        return(
            <div className="pestaña-productos">
                <div className="parte-superior">
                    <label className="titulo"><h1>Productos</h1></label>
                    <DialogoNuevoProducto
                        ObtenerJWTAcceso={this.props.ObtenerJWTAcceso}
                        recargarDatos={this.obtenerProductosAPI}
                    />
                    <input className="busqueda" type="text" id="busqueda" name="busqueda" placeholder="Buscar Producto..." value={this.state.busqueda} onChange={e => this.actualizar_estado(e)} />
                </div>
                <div className="cuadricula-productos">
                    <ol className="titulo-productos">
                        {/*<li>Código</li>*/}
                        <li>Nombre</li>
                        <li>Material</li>
                        <li>Precio Venta</li>
                        <li>Contenido</li>
                        <li>Unidad de Medida</li>
                        <li>Cantidad</li>
                        <li></li>
                    </ol>
                    {componentes_productos}
                </div>
            </div>
        );
    }
}

export default Productos;