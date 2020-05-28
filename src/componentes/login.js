import React, {Component} from 'react';
import axios from 'axios';

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
        axios.post('/autenticacion/login/', { // hacemos login en express con el usuario y contra
            usuario: this.state.usuario,
            password: this.state.clave
        })
        .then( res => { // cuando responda guardamos los tokens en localStorage
            console.log(res.data);
            localStorage.setItem('jwt-acceso', res.data.tokenAcceso);
            localStorage.setItem('jwt-refresco', res.data.tokenRefresco);
        })
        .catch( (error, res) => { // algun error
            console.log(error);
            console.log(error.response);
            alert(error.response.data.info.message);
        } )
    }

    render() {
        return (
            <div>
                <form onSubmit={ e => this.submit(e) }>
                    <label>usuario:</label><input type="text" name="usuario" onChange={e => this.change(e)} value={this.state.usuario}/>
                    <label>contraseña:</label><input type="password" name="clave" onChange={e => this.change(e)} value={this.state.clave}/>
                    <button type="submit">Entrar</button>
                </form>
            </div>
        );
    }
}

export default Login;