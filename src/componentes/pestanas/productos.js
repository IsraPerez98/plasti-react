import React, {Component} from 'react';
import axios from 'axios';

class BloqueProducto extends Component {
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
            datos_productos: "",
        };

        this.obtenerProductosAPI = this.obtenerProductosAPI.bind(this);
    }

    async obtenerProductosAPI() { 

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
            this.setState({
                cargado: true,
                datos_productos: productos,
            })
        })
        .catch( (error, res) => { // algun error
            console.log(error);
            console.log(error.response);
            if("response" in error ) {
                if("data" in error.response){
                    //alert(error.response.data);
                } 
            }else {
                alert("Error Desconocido");
            }
            
        } )
    }

    componentDidMount() {
        this.obtenerProductosAPI();
    }

    render() {
        const esta_logeado = this.props.estaLogeado();
        const cargado = this.state.cargado;
        const productos = this.state.datos_productos;
        
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