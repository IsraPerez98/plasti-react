import React, {Component} from 'react';
import axios from 'axios';
import ReactModal from 'react-modal';


class DialogoNuevoProducto extends Component {
    // se le pasa this.props.ObtenerJWTAcceso()
    // y this.props.recargarDatos()

    constructor(props) {
        super(props);

        this.state = {
            modalAbierto: false, // si esta abierto este dialogo o esta oculto

            nombre: "",
            material: "",
            precio_venta: "",
            contenido: "",
            unidad_medida: "",


        }

        this.abrirModal = this.abrirModal.bind(this);
        this.cerrarModal = this.cerrarModal.bind(this);
        this.actualizarEstado = this.actualizarEstado.bind(this);
        this.enviarNuevoProducto = this.enviarNuevoProducto.bind(this);
    }

    abrirModal() {
        this.setState({
            modalAbierto: true,
        })
    }

    cerrarModal() {
        this.setState({
            modalAbierto: false,
        })
    }

    actualizarEstado(e) {
        this.setState({
            [e.target.name]: e.target.value , // actualizamos el state del componente con los datos que ingrese el usuario
        })
    }

    async enviarNuevoProducto(e) {
        e.preventDefault();

        const jwt_acceso = await this.props.ObtenerJWTAcceso();

        axios.post('/api/nuevo/producto/', { // registramos en la api
            
            nombre: this.state.nombre,
            material: this.state.material,
            precio_venta: this.state.precio_venta,
            contenido: this.state.contenido,
            unidad_medida: this.state.unidad_medida,
        }, {
            headers: {
                "Authorization" : `Bearer ${jwt_acceso}`,
            }
        })
        .then( res => {
            console.log(res.data);

            this.props.recargarDatos(); // recargamos los datos de los productos
            
            alert("El producto se ha creado de forma exitosa.");

        })
        .catch( (error, res) => { // algun error
            console.log(error);
            console.log(error.response);
            if("data" in error.response){
                alert(error.response.data);
            } else {
                alert("Error Desconocido");
            }
        })

        this.cerrarModal();
    }

    render() {


        ReactModal.setAppElement('#root');

        return(
            <div>
                <button type="button" onClick={this.abrirModal}>Nuevo Producto</button>
                <ReactModal contentLabel="Nuevo Producto" isOpen={this.state.modalAbierto}>
                    <form onSubmit={ e => this.enviarNuevoProducto(e) }>
                        <label>Nombre del Producto:</label><input type="text" name="nombre" onChange={e => this.actualizarEstado(e)} value={this.state.nombre}/>
                        <label>Material:</label><input type="text" name="material" onChange={e => this.actualizarEstado(e)} value={this.state.material}/>
                        <label>Precio de Venta:</label><input type="number" name="precio_venta" onChange={e => this.actualizarEstado(e)} value={this.state.precio_venta}/>
                        <label>Contenido:</label><input type="text" name="contenido" onChange={e => this.actualizarEstado(e)} value={this.state.contenido}/>
                        <label>Unidad de Medida:</label><input type="text" name="unidad_medida" onChange={e => this.actualizarEstado(e)} value={this.state.unidad_medida}/>

                        <button type="submit">Aceptar</button>
                    </form>
                    <button type="button" onClick={this.cerrarModal}>Cancelar</button>
                </ReactModal>
            </div>
            )
    }
}


export default DialogoNuevoProducto;