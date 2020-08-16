import React, {Component} from 'react';
import axios from 'axios';

import '../../sass/pestanas/venta.scss';

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
            datos_productos: [{
                producto: "",
                cantidad: "1",
                precio: "0",
            }],
            
        }

        this.obtenerProductosAPI = this.obtenerProductosAPI.bind(this);
        this.obtenerClientesAPI = this.obtenerClientesAPI.bind(this);
        this.enviar = this.enviar.bind(this);
        this.agregarNuevoProducto = this.agregarNuevoProducto.bind(this);
        this.eliminarProducto = this.eliminarProducto.bind(this);
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

    async enviar(evento) { // se envian los datos a la api
        evento.preventDefault();

        const jwt_acceso = await this.props.ObtenerJWTAcceso();
        
        axios.post('/api/transaccion/venta', { // enviamos la venta a la api
            
            cliente: this.state.cliente,
            datos_productos: this.state.datos_productos,
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

    agregarNuevoProducto() {
        this.setState({
            datos_productos: this.state.datos_productos.concat({
                producto: "",
                cantidad: "1",
                precio: "0",
            })
        })
    }

    eliminarProducto(indice) {
        let datos_productos = this.state.datos_productos;
        datos_productos.splice(indice,1);
        this.setState({
            datos_productos: datos_productos,
        })
    }

    buscarProductoID(objectID) { // retorna el producto con el objectID indicado
        const datos_productos = this.state.productos.datos;
        //console.log({datos_productos});
        for(let i=0; i<datos_productos.length; i++) {
            if(datos_productos[i]._id === objectID) return datos_productos[i];
        }
    }

    actualizarEstadoOpcionesProductos(indice, evento) {
        let datos_productos = this.state.datos_productos; // obtenemos los datos actuales del state
        let dato_a_actualizar = datos_productos[indice];
        dato_a_actualizar[evento.target.name] = evento.target.value // cambiamos el indice con los valores pasados por el evento
        
        // si estamos cambiando el producto o la cantidad, el precio de la venta se cambia automatico a (precio x cantidad)
        if((evento.target.name === "producto" || evento.target.name === "cantidad") && !isNaN(dato_a_actualizar.cantidad)  ) {
            const producto = this.buscarProductoID(dato_a_actualizar.producto); //obtenemos el producto como objeto

            dato_a_actualizar.precio = dato_a_actualizar.cantidad * producto.precio_venta;
        }
        
        this.setState({ // llamamos a setState para actualizar

            
            

            datos_productos: datos_productos,
        })
    }

    render() {
        const cargado = this.state.productos.cargado && this.state.clientes.cargado;
        const error = this.state.productos.error || this.state.clientes.error;
        const productos = this.state.productos.datos;
        const clientes = this.state.clientes.datos;
        
        //console.log(this.state);

        if(error) return <div> ERROR: {error} </div>;
        if(!cargado) return <div> Cargando .... </div>;

        let clientes_opciones = []; // las opciones de los clientes

        for ( const [indice, cliente] of clientes.entries() ) { // por cada cliente que envie la api, lo ponemos como opcion
            clientes_opciones.push(<option value={cliente["_id"]}>{cliente.nombre}</option>);
        } 

        let productos_opciones = []; // las opciones de productos

        for (const [indice, producto] of productos.entries() ) { // por todos los productos que envie la api los ponemos como opcion
            productos_opciones.push(<option value={producto["_id"]}>{`${producto.nombre} - ${producto.material}`}</option>);
        }

        let opciones = []; // las opciones respecto a los productos, incluyendo multiples de ellos

        const datos_productos = this.state.datos_productos;

        //console.log("datos_productos ", datos_productos);

        let precio_total = 0;

        for (let i=0; i<datos_productos.length ; i++) { // por cada producto que el usuario desea agregar
            
            const item = datos_productos[i];
            
            precio_total = precio_total + ( parseInt(item.precio) || 0 );

            opciones.push(<li>
                    <select name="producto" className="select-producto" value={item.producto} onChange={e => this.actualizarEstadoOpcionesProductos(i,e)}>
                        <option value="" disabled>Seleccione un producto ...</option>
                        {productos_opciones}
                    </select> 
                    <input name="cantidad" min="0" className="input-cantidad" placeholder="Cantidad" type="number" value={item.cantidad} onChange={e => this.actualizarEstadoOpcionesProductos(i,e)}></input>
                    <input name="precio" min="0" className="input-precio" placeholder="Precio" type="number" value={item.precio} onChange={e => this.actualizarEstadoOpcionesProductos(i,e)}></input>
                    <button type="button" className="boton-eliminar-producto" onClick={e => this.eliminarProducto(i)}>Eliminar</button>
            </li>);
        }


        return(
            <div className="pestaña-venta">
                <div className="parte-superior">
                    <label className="titulo"><h1>Venta</h1></label>
                </div>
                <form onSubmit={ this.enviar }>
                    <div className="div-seleccion-productos">
                        <label className="texto-productos">Productos:</label>
                        <ol className="seleccion-productos">
                            <li className="titulo-campos">
                                <label className="label-producto">Producto</label>
                                <label className="label-cantidad">Cantidad</label>
                                <label className="label-precio">Precio</label>
                                <label className="label-vacio"></label>
                            </li>
                            {opciones}
                        </ol>
                        <button type="button" className="boton-nuevo-producto" onClick={this.agregarNuevoProducto}>Agregar Producto</button>
                    </div>
                    <div className="div-seleccion-cliente">
                        <label className="texto-cliente">Cliente:</label>
                        <select id="cliente" className="select-cliente" name="cliente" value={this.state.cliente} onChange={e => this.actualizar_estado(e)}>
                            <option value="" disabled>Seleccione un cliente ...</option>
                            {clientes_opciones}
                        </select>
                    </div>
                    <div className="div-precio-total">
                        <label className="label-total">Total: </label>
                        <label className="unidad-total">${precio_total.toLocaleString('es')}</label>
                    </div>
                    <button type="submit" className="boton-finalizar">Finalizar</button>
                </form> 
            </div>
        )
    };
}

export default Venta;