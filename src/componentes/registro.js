import React, {Component} from 'react';
import axios from 'axios';

class Registro extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usuario: "",
            nombre: "",
            password: "",
            password_confirmar: ""
        };

        this.registrar = this.registrar.bind(this);

    }

    async registrar(e) { // enviamos al servidor el nuevo registro
        e.preventDefault();

        //revisamos que la clave cumpla el estandar
        const clave1 = this.state.password;
        const clave2 = this.state.password_confirmar;

        if(clave1 !== clave2) {
            return alert("Las 2 claves deben ser iguales");
        }
        //TODO: AGREGAR MAS ESTANDARES PARA LA CLAVE

        
        const jwt_acceso = await this.props.ObtenerJWTAcceso();

        //console.log("jwt registro: ", jwt_acceso);
        
        axios.post('/autenticacion/registrar', { // registramos en la api
            
            usuario: this.state.usuario,
            nombre: this.state.nombre,
            password: this.state.password
        }, {
            headers: {
                "Authorization" : `Bearer ${jwt_acceso}`,
            }
        })
        .then( res => {
            console.log(res.data);
            
            alert("El usuario se ha creado de forma exitosa.");
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
    }


    actualizarEstado(e) {
        this.setState({
            [e.target.name]: e.target.value , // actualizamos el state del componente con los datos que ingrese el usuario
        })
    }

    render() {
        const esta_logeado = this.props.estaLogeado();
        return (
            <div>
            {esta_logeado ? (
                
                <div>
                    <form onSubmit={ e => this.registrar(e) }>
                        <label>Usuario:</label><input type="text" name="usuario" onChange={e => this.actualizarEstado(e)} value={this.state.usuario}/>
                        <label>Nombre Formal:</label><input type="text" name="nombre" onChange={e => this.actualizarEstado(e)} value={this.state.nombre}/>
                        <label>Contraseña:</label><input type="password" name="password" onChange={e => this.actualizarEstado(e)} value={this.state.password}/>
                        <label>Confirmar Contraseña:</label><input type="password" name="password_confirmar" onChange={e => this.actualizarEstado(e)} value={this.state.password_confirmar}/>
                        <button type="submit">Entrar</button>
                    </form>
                </div>
            )
            : (
                <div>Debe ingresar con su cuenta para registrar un nuevo usuario.</div>
            )}
            </div>
        );
    }
}

export default Registro;