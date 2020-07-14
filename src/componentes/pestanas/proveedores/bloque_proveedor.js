import React, {Component} from 'react';
import DialogoEliminarProveedor from './dialogo_eliminar_proveedor';

class BloqueProveedor extends Component { // los bloques que componen cada proveedor
    render() {

        const datos_persona = this.props.datos_persona;

        return (
            <div className="div-datos-proveedores">
                <ol className="datos-proveedores">
                    <li>{datos_persona.rut}</li>
                    <li>{datos_persona.nombre}</li>
                    <li>{datos_persona.telefono}</li>
                    <li>{datos_persona.email}</li>
                    <li>{datos_persona.direccion}</li>
                    <li>{datos_persona.pagina_web}</li>
                    <DialogoEliminarProveedor
                        datos_proveedor = {datos_persona}
                        ObtenerJWTAcceso={this.props.ObtenerJWTAcceso}
                        recargarDatos={this.props.recargarDatos}
                    />
                </ol>
            </div>
        );
    }
}

export default BloqueProveedor;