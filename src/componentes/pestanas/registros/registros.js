import React, {Component} from 'react';

import RegistrosPlegables from './registros_plegables/registros_plegables';

class Registro extends Component {
    // se le pasa this.props.ObtenerJWTAcceso
    // y this.props.estaLogeado

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <RegistrosPlegables
                ObtenerJWTAcceso={this.props.ObtenerJWTAcceso}
                estaLogeado={this.props.estaLogeado}
            />
        )
    }
}


export default Registro;