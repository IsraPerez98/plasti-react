import React, { Component } from "react";
import jwt from "jsonwebtoken";
import Collapsible from "react-collapsible";
import { NavLink } from "react-router-dom";
import axios from "axios";

import "../sass/barra-superior.scss";

class BarraSuperior extends Component {
    // se le pasa this.props.estaLogeado
    constructor(props) {
        super(props);

        this.obtenerNombreUsuario = this.obtenerNombreUsuario.bind(this);
        this.logout = this.logout.bind(this);
    }

    obtenerNombreUsuario() {
        const jwt_acceso = localStorage.getItem("jwt-acceso");
        const jwt_acceso_decodificado = jwt.decode(jwt_acceso, {
            complete: true,
        });

        //return jwt_acceso_decodificado.payload.usuario;
        return jwt_acceso_decodificado.payload.nombre;
    }

    logout() {
        axios
            .delete("/autenticacion/logout/", {
                // hacemos logout en express con el token de refresco
                token: localStorage.getItem("jwt-refresco"),
            })
            .then((res) => {
                console.log(res.data);

                //eliminamos los tokens en localStorage
                localStorage.removeItem("jwt-acceso");
                localStorage.removeItem("jwt-refresco");

                //volvemos al inicio
                window.location.href = "/";
            })
            .catch((error, res) => {
                // algun error
                console.log(error);
                console.log(error.response);
                alert(error.response.data);
            });
    }

    render() {
        const esta_logeado = this.props.estaLogeado();

        if (!esta_logeado) return ""; // ordinaria la wea xdd

        const nombre_usuario = this.obtenerNombreUsuario();

        return (
            <div>
                <div className="espacio-barra-superior"></div>
                <div className="barra-superior">
                    <div className="logo"></div>
                    <Collapsible
                        trigger={
                            <div className="boton-usuario">
                                <p className="nombre-usuario">
                                    {nombre_usuario}
                                </p>
                            </div>
                        }
                    >
                        <div className="menu-usuario">
                            <NavLink
                                to={"/usuarios"}
                                className="boton-usuarios"
                            >
                                <p>Usuarios</p>
                            </NavLink>
                            <button
                                className="boton-logout"
                                onClick={this.logout}
                            >
                                <p>Logout</p>
                            </button>
                        </div>
                    </Collapsible>
                </div>
            </div>
        );
    }
}

export default BarraSuperior;
