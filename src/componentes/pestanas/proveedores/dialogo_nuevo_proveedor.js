import React, {Component} from 'react';
import axios from 'axios';
import ReactModal from 'react-modal';


class DialogoNuevoProveedor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalAbierto: false, // si esta abierto este dialogo o esta oculto

            rut: "",
            nombre: "",
            telefono: "",
            email: "",
            direccion: "",
            pagina_web: ""
        }

        this.abrirModal = this.abrirModal.bind(this);
        this.cerrarModal = this.cerrarModal.bind(this);
        this.actualizarEstado = this.actualizarEstado.bind(this);
        this.enviarNuevoProveedor = this.enviarNuevoProveedor.bind(this);
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

    async enviarNuevoProveedor(e) {
        e.preventDefault();

        const jwt_acceso = await this.props.ObtenerJWTAcceso();

        axios.post('/api/nuevo/proveedor/', { // registramos en la api
            
            rut: this.state.rut,
            nombre: this.state.nombre,
            telefono: this.state.telefono,
            email: this.state.email,
            direccion: this.state.direccion,
            pagina_web: this.state.pagina_web,
        }, {
            headers: {
                "Authorization" : `Bearer ${jwt_acceso}`,
            }
        })
        .then( res => {
            console.log(res.data);
            
            alert("El proveedor se ha creado de forma exitosa.");

        })
        .catch( (error, res) => { // algun error
            console.log(error);
            console.log(error.response);
            if("data" in error.response){
                alert(error.response.data);
            } else {
                alert("Error Desconocido");
            }
            
        } )

        this.props.obtenerProveedoresAPI(); // recargamos los datos
        this.cerrarModal();
    }

    render() {

        ReactModal.setAppElement('#root');

        return(
            <div className="div-nuevo-proveedor">
                <button type="button" className="boton-nuevo-proveedor" onClick={this.abrirModal}>Nuevo Proveedor</button>
                <ReactModal contentLabel="Nuevo Proveedor" isOpen={this.state.modalAbierto}>
                    <form onSubmit={ e => this.enviarNuevoProveedor(e) }>
                        <label>RUT:</label><input type="text" name="rut" onChange={e => this.actualizarEstado(e)} value={this.state.rut}/>
                        <label>Nombre:</label><input type="text" name="nombre" onChange={e => this.actualizarEstado(e)} value={this.state.nombre}/>
                        <label>Telefono:</label><input type="text" name="telefono" onChange={e => this.actualizarEstado(e)} value={this.state.telefono}/>
                        <label>E-mail:</label><input type="text" name="email" onChange={e => this.actualizarEstado(e)} value={this.state.email}/>
                        <label>Direccion:</label><input type="text" name="direccion" onChange={e => this.actualizarEstado(e)} value={this.state.direccion}/>
                        <label>Pagina Web:</label><input type="text" name="pagina_web" onChange={e => this.actualizarEstado(e)} value={this.state.pagina_web}/>

                        <button type="submit">Aceptar</button>
                    </form>
                    <button type="button" onClick={this.cerrarModal}>Cancelar</button>
                </ReactModal>
            </div>
            )
    }

}

export default DialogoNuevoProveedor;
