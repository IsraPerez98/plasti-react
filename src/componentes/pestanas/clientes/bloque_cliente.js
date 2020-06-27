import React, {Component} from 'react';

class BloqueCliente extends Component { // los bloques que componen cada cliente
    render() {
        const id = this.props.id;
        const rut = this.props.rut;
        const nombre = this.props.nombre;
        const telefono = this.props.telefono;
        const email = this.props.email; 
        const direccion = this.props.direccion;
        const local = this.props.local;

        return (
            <div>
                <ol>
                <li>{id}</li>
                <li>{rut}</li>
                <li>{nombre}</li>
                <li>{telefono}</li>
                <li>{email}</li>
                <li>{direccion}</li>
                <li>{local}</li>
                </ol>
            </div>
        );
    }
}

export default BloqueCliente;