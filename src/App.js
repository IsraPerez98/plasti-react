import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import BarraNavegacion from './componentes/navegacion';
import Login from './componentes/login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <BarraNavegacion/>
					<Route path="/login" component={Login} />
  			</BrowserRouter>
    </div>
  );
}

export default App;
