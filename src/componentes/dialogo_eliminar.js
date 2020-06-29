import React, {Component} from 'react';

class DialogoEliminar extends Component {
    // se le pasa this.props.funcionEliminar que es la funcion que se ejecuta al hacer click en aceptar
    // this.props.windowConfirm que tiene el texto que va dentro del window.confirm

    
    constructor(props) {
        super(props);

        this.abrirDialogoEliminar = this.abrirDialogoEliminar.bind(this);
    }

    abrirDialogoEliminar() {
        if(window.confirm(this.props.windowConfirm)) {
            this.props.funcionEliminar();
        }
    }

    render() {

        return (
            <div>
                <button type="button" onClick={this.abrirDialogoEliminar}>Eliminar</button>
            </div>
        )
    }
}

export default DialogoEliminar;