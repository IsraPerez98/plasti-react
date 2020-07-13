import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

import "../sass/barra_navegacion.scss";

class BarraNavegacion extends Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
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

        return (
            <div className="barra-navegacion">
                <nav className="navbar">
                    <ul className="lista-navegacion">
                        <li>
                            <NavLink
                                exact
                                to={"/"}
                                className="nav-link"
                            >
                                <p>Inicio</p>
                            </NavLink>
                        </li>
                        {/*
                        <li>
                            <NavLink to={"/usuarios"} className="nav-link">
                                <p>Usuarios</p>
                            </NavLink>
                        </li>
                        */}
                        <li>
                            <NavLink to={"/productos"} className="nav-link">
                                <p>Productos</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/clientes"} className="nav-link">
                                <p>Clientes</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/proveedores"} className="nav-link">
                                <p>Proveedores</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/compra"} className="nav-link">
                                <p>Compra</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/venta"} className="nav-link">
                                <p>Venta</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/registros"} className="nav-link">
                                <p>Registros</p>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default BarraNavegacion;
