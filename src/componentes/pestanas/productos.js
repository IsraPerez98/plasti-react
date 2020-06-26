import React, {Component} from 'react';
import axios from 'axios';

class BloqueProducto extends Component { // los bloques que componen cada producto
    render() {
        const id = this.props.id;
        const nombre = this.props.nombre;
        const material = this.props.material;
        const precio = this.props.precio; 
        const contenido = this.props.contenido;
        const unidad_medida = this.props.unidad_medida;
        const cantidad = this.props.cantidad;


        return (
            <div>
                <ol>
                <li>{id}</li>
                <li>{nombre}</li>
                <li>{material}</li>
                <li>{precio}</li>
                <li>{contenido}</li>
                <li>{unidad_medida}</li>
                <li>{cantidad}</li>
                </ol>
            </div>
        );
    }
}

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
        const esta_logeado = this.props.estaLogeado();
        const cargado = this.state.cargado;
        const error = this.state.error;
        const productos = this.state.datos_productos;
        
        if(error) return <div> ERROR {error} </div>;
        if(!esta_logeado) return <div> Debe ingresar con su cuenta para acceder a este panel. </div>;
        if(!cargado) return <div> Cargando... </div>;

        let componentes_productos = [];

        for ( const [indice, producto] of productos.entries() ) {
            let mostrar = false;

            const str_busqueda = this.state.busqueda.toLowerCase();

            if(!(str_busqueda)) {
                mostrar = true; // si no se esta buscando nada
            } else {
                if(producto.nombre.toLowerCase().includes(str_busqueda)) mostrar = true;
                if(producto.material.nombre.toLowerCase().includes(str_busqueda)) mostrar = true;
                //if(producto.precio_venta.toLowerCase().includes(str_busqueda)); mostrar = true;
                if(producto.contenido.toLowerCase().includes(str_busqueda)) mostrar = true;
                if(producto.unidad_medida.nombre.toLowerCase().includes(str_busqueda)) mostrar = true;
            }
            

            if(mostrar){
                componentes_productos.push(<li key={indice}><BloqueProducto 
                    id={producto["_id"]}
                    nombre={producto.nombre}
                    material={producto.material.nombre}
                    precio={producto.precio_venta}
                    contenido={producto.contenido}
                    unidad_medida={producto.unidad_medida.nombre}
                /></li>)
            }
        } 

        return(
            <div>
                <label><h1>Productos</h1></label>
                <div>
                    <label>Busqueda:</label>
                    <input type="text" id="busqueda" name="busqueda" value={this.state.busqueda} onChange={e => this.actualizar_estado(e)} />
                </div>
                {componentes_productos}
            </div>
        );
    }
}

export default Productos;