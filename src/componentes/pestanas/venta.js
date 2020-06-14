import React, {Component} from 'react';
import axios from 'axios';

class Venta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productos: {
                cargado: false,
                error: null,
                datos: {},
            },
            clientes: {
                cargado: false,
                error: null,
                datos: {},
            },

            //estos datos se subiran a la api
            cliente: "",
            producto: "",
            cantidad: 0,
            precio: 0,
        }

        this.obtenerProductosAPI = this.obtenerProductosAPI.bind(this);
        this.obtenerClientesAPI = this.obtenerClientesAPI.bind(this);
        this.enviar = this.enviar.bind(this);
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
                productos: {
                    cargado: true,
                    datos: productos,
                },
            });
        })
        .catch( (error, res) => { // algun error
            this.setState({
                productos : {
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

    async obtenerClientesAPI() { //llamamos a la api y refrescamos los valores

        const jwt_acceso = await this.props.ObtenerJWTAcceso(); 

        
        axios.get('/api/get/clientes', { // llamamos a la api pidiendo los clientes
            headers: {
                "Authorization" : `Bearer ${jwt_acceso}`,
            }
        })
        .then( res => {
            const clientes = res.data;
            
            //console.log("clientes api:", clientes);
            this.setState({ // seteamos el estado del componente con los datos de la api
                clientes: {
                    cargado: true,
                    datos: clientes,
                }
            });
        })
        .catch( (error, res) => { // algun error
            this.setState({
                clientes: {
                    cargado: true,
                    error: JSON.stringify(error), // para que el error siempre se pase como texto
                }
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

    actualizar_estado(e) {
        //console.log(this.state);
        this.setState({
            [e.target.name]: e.target.value , // actualizamos el state del componente con los datos que ingrese el usuario
        })
    }


    componentDidMount() { // cuando se monte el componenete llamamos a la api
        this.obtenerProductosAPI();
        this.obtenerClientesAPI();
    }

    async enviar(evento) {
        evento.preventDefault();

        const jwt_acceso = await this.props.ObtenerJWTAcceso();
        
        axios.post('/api/transaccion/venta', { // enviamos la venta a la api
            
            cliente: this.state.cliente,
            producto: this.state.producto,
            cantidad: this.state.cantidad,
            precio: this.state.precio,
        }, {
            headers: {
                "Authorization" : `Bearer ${jwt_acceso}`,
            }
        })
        .then( res => {
            console.log(res.data);
            
            alert("La venta se ha registrado de forma exitosa.");
        })
        .catch( (error, res) => { // algun error
            console.log(error);
            console.log(error.response);
            alert(error);
            if("data" in error.response){
                alert(error.response.data);
            }
            
        } )
    }

    render() {
        const esta_logeado = this.props.estaLogeado();
        const cargado = this.state.productos.cargado && this.state.clientes.cargado;
        const error = this.state.productos.error || this.state.clientes.error;
        const productos = this.state.productos.datos;
        const clientes = this.state.clientes.datos;
        
        //console.log(this.state);

        if(!esta_logeado) return <div> Debe ingresar con su cuenta para acceder a este panel. </div>;
        if(error) return <div> ERROR: {error} </div>;
        if(!cargado) return <div> Cargando .... </div>;

        let clientes_opciones = [];

        for ( const [indice, cliente] of clientes.entries() ) {
            clientes_opciones.push(<option value={cliente["_id"]}>{cliente.nombre}</option>);
        } 

        let productos_opciones = [];

        for (const [indice, producto] of productos.entries() ) {
            productos_opciones.push(<option value={producto["_id"]}>{producto.nombre}</option>);
        }


        return(
            <div>
                <form onSubmit={ this.enviar }>
                <div>
                    <label>Producto:</label>
                    <select name="producto" value={this.state.producto} onChange={e => this.actualizar_estado(e)}>
                        <option value="" disabled>Seleccione un producto ...</option>
                        {productos_opciones}
                    </select> 
                    <input name="cantidad" type="number" value={this.state.cantidad} onChange={e => this.actualizar_estado(e)}></input>
                    <input name="precio" type="number" value={this.state.precio} onChange={e => this.actualizar_estado(e)}></input>
                </div>
                <div>
                    <label>Cliente:</label>
                    <select id="cliente" name="cliente" value={this.state.cliente} onChange={e => this.actualizar_estado(e)}>
                        <option value="" disabled>Seleccione un cliente ...</option>
                        {clientes_opciones}
                    </select>
                </div>
                <button type="submit">Finalizar</button>
                </form> 
            </div>
        )
    };
}

export default Venta;