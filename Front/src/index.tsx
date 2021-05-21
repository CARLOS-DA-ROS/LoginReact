import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router";
import RequireAuth from "./RequireAuth";
import Wispro from "./wispro";
import Login from './Login';
import Listado from './Listado';
import Formulario from './Formulario';

// PRINCIPAL CLASE, SIRVE PARA TRAER AL 'DOM'
// TODAS LAS RUTAS QUE USA EL 'NAVBAR'
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Fragment>
      <Route path="/" component={Login} exact />
      <Route path="/wispro" component={RequireAuth(Wispro)} />
      <Route path="/listado" component={Listado}/>
      <Route path="/formulario" component={Formulario}/>
    </Fragment>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

