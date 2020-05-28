import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class BarraNavegacion extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <ul className="navbar-nav mr-auto">
                        <li><Link to={'/'} className="nav-link"> Inicio </Link></li>
                        <li><Link to={'/login'} className="nav-link">Login</Link></li>
                    </ul>
                </nav>
          </div>
        );
    }
}

export default BarraNavegacion;