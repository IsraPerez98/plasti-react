import React from 'react';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import BarraNavegacion from './componentes/navegacion';

import Login from './componentes/login';
import Usuarios from './componentes/pestanas/usuarios/usuarios';
//import Registro from './componentes/registro';

import Productos from './componentes/pestanas/productos/productos';

import Clientes from './componentes/pestanas/clientes/clientes.js';
import Proveedores from './componentes/pestanas/proveedores/proveedores.js';

import Venta from './componentes/pestanas/venta';
import Compra from './componentes/pestanas/compra';

import Registros from './componentes/pestanas/registros/registros';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.ObtenerJWTAcceso = this.ObtenerJWTAcceso.bind(this);
    this.estaLogeado = this.estaLogeado.bind(this);
  }

  async RecargarJWTAcceso() {
    try {
      //esta func obtiene un nuevo JWT de acceso desde la api usando el JWT de refresco, lo setea en localStorage y lo retorna
      const jwt_refresco = localStorage.getItem('jwt-refresco');
      const res = await axios.post('/autenticacion/token/', { // refresh con el token de refresco
        token: jwt_refresco,
      });
      console.log(res.data);
      const nuevo_token = res.data.tokenAcceso;
      console.log("Nuevo token: ", nuevo_token);
      localStorage.setItem('jwt-acceso', nuevo_token);
      return nuevo_token;
    
    } catch(error) {
      console.log(error);
      console.log(error.response);
      alert(error.response.data);
      alert("Por favor salga de su cuenta e ingrese nuevamente.");
    }
  }

  async ObtenerJWTAcceso() {
    //esta funcion obtiene el JWT desde el localStorage
    //comprueba si esta actualizado y si no, solicita otro desde la api

    const jwt_acceso = localStorage.getItem('jwt-acceso');
    const jwt_acceso_decodificado = jwt.decode(jwt_acceso, {complete: true});

    const fecha_actual = new Date();

    //console.log(jwt_acceso);
    //console.log(jwt_acceso_decodificado , "    ", fecha_actual.getTime());

    console.log("Token actual: ", jwt_acceso_decodificado);
    console.log("Tiempo actual: ", fecha_actual.getTime());
    console.log("EXP: ", jwt_acceso_decodificado.payload.exp * 1000);

    if(jwt_acceso_decodificado.payload.exp * 1000 < fecha_actual.getTime()) { // si la fecha de expiracion es menor a la actual
      console.log("Token expirado, obteniendo uno nuevo");
      return await this.RecargarJWTAcceso();
    } else {
      return jwt_acceso; // se retorna el jwt actual
    }

  }

  estaLogeado() { // retorna bool si el usuario esta logeado
    //console.log("token login: ",localStorage.getItem('jwt-acceso'));
    return localStorage.getItem('jwt-acceso') != null; // si el usuario hizo login tiene un jwt-acceso
  }

  render(){
    return (
      <div className="App">
        <BrowserRouter>
            <BarraNavegacion estaLogeado={this.estaLogeado} />
            {/* https://tylermcginnis.com/react-router-pass-props-to-components/ */}
            <Route 
              path="/login" 
              render={(props) => 
                <Login 
                  estaLogeado={this.estaLogeado} 
                />}
            />
            <Route 
              path="/usuarios" 
              render={(props) => 
                <Usuarios
                  estaLogeado={this.estaLogeado} 
                  ObtenerJWTAcceso={this.ObtenerJWTAcceso} 
                /> }
            />
            <Route 
              path="/productos" 
              render={(props) => 
                <Productos
                  estaLogeado={this.estaLogeado} 
                  ObtenerJWTAcceso={this.ObtenerJWTAcceso} 
                /> }
            />
            <Route 
              path="/clientes" 
              render={(props) => 
                <Clientes
                  estaLogeado={this.estaLogeado} 
                  ObtenerJWTAcceso={this.ObtenerJWTAcceso} 
                /> }
            />
            <Route 
              path="/proveedores" 
              render={(props) => 
                <Proveedores
                  estaLogeado={this.estaLogeado} 
                  ObtenerJWTAcceso={this.ObtenerJWTAcceso} 
                /> }
            />
            <Route 
              path="/compra" 
              render={(props) => 
                <Compra
                  estaLogeado={this.estaLogeado} 
                  ObtenerJWTAcceso={this.ObtenerJWTAcceso} 
                /> }
            />
            <Route 
              path="/venta" 
              render={(props) => 
                <Venta
                  estaLogeado={this.estaLogeado} 
                  ObtenerJWTAcceso={this.ObtenerJWTAcceso} 
                /> }
            />
            <Route 
              path="/registros" 
              render={(props) => 
                <Registros
                  estaLogeado={this.estaLogeado} 
                  ObtenerJWTAcceso={this.ObtenerJWTAcceso} 
                /> }
            />
          </BrowserRouter>
      </div>
    );
  }

  
}

export default App;
