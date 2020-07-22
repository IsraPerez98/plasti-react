import React, {Component} from 'react';
import axios from 'axios';

import '../sass/pestanas/login.scss';

import logo from '../img/logo.png';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usuario: "",
            clave: ""
        };

        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
    }

    change(e) { // al cambio de estado
        this.setState({
            [e.target.name]: e.target.value , // actualizamos el state del componente con el usuario y la clave ...
        })
    }

    submit(e) {
        e.preventDefault(); //no recargar la pagina
        axios.post('/autenticacion/login', { // hacemos login en express con el usuario y contra
            usuario: this.state.usuario,
            password: this.state.clave
        })
        .then( res => { // cuando responda guardamos los tokens en localStorage
            console.log(res.data);
            localStorage.setItem('jwt-acceso', res.data.tokenAcceso);
            localStorage.setItem('jwt-refresco', res.data.tokenRefresco);

            //volvemos al inicio
            window.location.href = '/';
        })
        .catch( (error, res) => { // algun error
            console.log(error);
            console.log(error.response);
            alert(error.response.data.info.message);
        } )
    }

    render() {
        //console.log("props:", this.props);
        const esta_logeado = this.props.estaLogeado();
        return (
            <div>
            {esta_logeado ? (
                <div>El Usuario ya ha ingresado</div>
            )
            : (
                <div className="pestaña-login">
                    <div className="espacio-barra-superior">
                        <div className="barra-superior">
                            <img className="logo" src={logo}></img>
                        </div>
                    </div>
                    <form onSubmit={ e => this.submit(e) } className="cuadro-login">
                        <div className="campos">
                            <label>Usuario</label>
                            <input type="text" name="usuario" placeholder="Usuario" onChange={e => this.change(e)} value={this.state.usuario}/>
                            <label>Contraseña</label>
                            <input type="password" name="clave" placeholder="Contraseña" onChange={e => this.change(e)} value={this.state.clave}/>
                        </div>
                        <button className="boton-acceder" type="submit">Acceder</button>
                    </form>
                </div>
            )}
            </div>
        );
    }
}

export default Login;