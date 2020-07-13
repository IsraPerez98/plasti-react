import React, {Component} from 'react';

import RegistrosPlegables from './registros_plegables/registros_plegables';

class Registro extends Component {
    // se le pasa this.props.ObtenerJWTAcceso

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <RegistrosPlegables
                ObtenerJWTAcceso={this.props.ObtenerJWTAcceso}
            />
        )
    }
}


export default Registro;