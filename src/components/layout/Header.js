import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import CerrarSesion from './CerrarSesion';
import BotonRegistro from './BotonRegistro';

const Header = ({session}) => {

  let barra = (session.getUsuario) ? <NavegacionAutenticado session={session} /> : <NavegacionNoAutenticado />;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex mb-4">
        <div className="container">
           {barra}
        </div>        
    </nav>
  )
};

const NavegacionNoAutenticado = () => (
  <h3 className="navbar-brand text.light font-weight-bold" >CRM</h3>
);

const NavegacionAutenticado = (session) => (
  <Fragment>
    <Link className="navbar-brand text.light font-weight-bold" to="/">CRM</Link>
      <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navigation">
        <ul className="navbar-nav ml-auto text-right">
            <li className="nav-item dropdown mr-md-2">
              <button className="nav-link dropdown-toggle btn btn-block btn-success" data-toggle="dropdown">
                  Clientes
              </button>
              <div className="dropdown-menu" aria-labelledby="navegacion">
                <Link className="dropdown-item" to={`/clientes`}>Ver Clientes</Link>
                <Link className="dropdown-item" to={`/clientes/nuevo`}>Nuevo Cliente</Link>
              </div>
            </li>
            <li className="nav-item dropdown">
              <button className="nav-link dropdown-toggle btn btn-block btn-success" data-toggle="dropdown">
                  Productos
              </button>
              <div className="dropdown-menu" aria-labelledby="navegacion">
                <Link className="dropdown-item" to={`/productos`}>Ver Productos</Link>
                <Link className="dropdown-item" to={`/productos/nuevo`}>Nuevo Producto</Link>
              </div>
            </li>
            <CerrarSesion />
            <BotonRegistro session={session} />
        </ul>
      </div>
  </Fragment>
);

export default Header;