import React, {Component} from 'react';

import RegistrosPlegables from './registros_plegables/registros_plegables';

import '../../../sass/pestanas/registros.scss';

class Registro extends Component {
    // se le pasa this.props.ObtenerJWTAcceso

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="pestaña-registros">
                <div className="registros-plegables">
                    <RegistrosPlegables
                        ObtenerJWTAcceso={this.props.ObtenerJWTAcceso}
                    />
                </div>
            </div>
        )
    }
}


export default Registro;