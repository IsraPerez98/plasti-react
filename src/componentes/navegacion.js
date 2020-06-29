import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class BarraNavegacion extends Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
    }

    logout() {
        axios.delete('/autenticacion/logout/', { // hacemos logout en express con el token de refresco
            token: localStorage.getItem('jwt-refresco'),
        })
        .then( res => {
            console.log(res.data);

            //eliminamos los tokens en localStorage
            localStorage.removeItem('jwt-acceso');
            localStorage.removeItem('jwt-refresco');

            //volvemos al inicio
            window.location.href = '/';
        })
        .catch( (error, res) => { // algun error
            console.log(error);
            console.log(error.response);
            alert(error.response.data);
        } )
    }

    render() {
        const esta_logeado = this.props.estaLogeado();

        console.log("esta logeado: ", esta_logeado);

        return (
            <div>
                <nav className="navbart">
                    <ul className="navbar-nav">
                        <li><Link to={'/'} className="nav-link"> Inicio </Link></li>
                        {esta_logeado ? (
                            [
                                <li key={0}><button className="boton-logout" onClick={this.logout} >Logout</button></li>,
                                <li key={1}><Link to={'/registro'} className="nav-link">Registro</Link> </li>,
                                <li key={2}><Link to={'/productos'} className="nav-link">Productos</Link> </li>,
                                <li key={3}><Link to={'/clientes'} className="nav-link">Clientes</Link> </li>,
                                <li key={4}><Link to={'/proveedores'} className="nav-link">Proveedores</Link> </li>,
                                <li key={5}><Link to={'/venta'} className="nav-link">Venta</Link> </li>,
                            ])
                        : (
                            <li><Link to={'/login'} className="nav-link">Login</Link></li>
                        )}
                    </ul>
                </nav>
          </div>
        );
    }
}

export default BarraNavegacion;