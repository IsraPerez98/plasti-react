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
            datos_productos: "", // aqui almacenamos los datos de los productos cuando se llama a la api
        };

        this.obtenerProductosAPI = this.obtenerProductosAPI.bind(this);
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

    render() {
        const esta_logeado = this.props.estaLogeado();
        const cargado = this.state.cargado;
        const error = this.state.error;
        const productos = this.state.datos_productos;
        
        if(error) return <div> ERROR {error} </div>
        if(!esta_logeado) return <div> Debe ingresar con su cuenta para acceder a este panel. </div>;
        if(!cargado) return <div> Cargando... </div>;

        let componentes_productos = [];

        for ( const [indice, producto] of productos.entries() ) {
            componentes_productos.push(<li key={indice}><BloqueProducto 
                id={producto["_id"]}
                nombre={producto.nombre}
                material={producto.material.nombre}
                precio={producto.precio_venta}
                contenido={producto.contenido}
                unidad_medida={producto.unidad_medida.nombre}
            /></li>)
        } 

        return(
            <div>
                {componentes_productos}
            </div>
        );
    }
}

export default Productos;