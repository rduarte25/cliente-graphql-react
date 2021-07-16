import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/layout/Header';
import Clientes from './components/clientes/Clientes';
import NuevoCliente from './components/clientes/NuevoCliente';
import EditarCliente from './components/clientes/EditarCliente';
import Productos from './components/productos/Productos';
import NuevoProducto from './components/productos/NuevoProducto';
import EditarProducto from './components/productos/EditarProducto';
import NuevoPedido from './components/pedidos/NuevoPedido';
import PedidosCliente from './components/pedidos/PedidosCliente';
import Panel from './components/panel/Panel';
import Registro from './components/auth/Registro';
import Login from './components/auth/Login';
import Session from './components/Session'

// Componentes

const App = ({refetch, session}) => {
  const { getUsuario } = session;
  const message = (getUsuario) ? `Bienvenido: ${getUsuario.nombre}` : <Redirect to="/login" />;
  
  return (
      <Router>
        <Fragment>
          <Header session={session}/>
          <div className="container">
            <p className="text-right">{message}</p>            
            <Switch>                
              <Route exact path="/clientes" render={() => <Clientes session={session}/>}/>
              <Route exact path="/clientes/nuevo" render={() => <NuevoCliente session={session}/>}/>
              <Route exact path="/clientes/editar/:id" component={EditarCliente}/>
              <Route exact path="/productos" component={Productos}/>
              <Route exact path="/productos/nuevo" component={NuevoProducto}/>
              <Route exact path="/productos/editar/:id" component={EditarProducto}/>
              <Route exact path="/pedidos/nuevo/:id" render={() => <NuevoPedido session={session}/>}/>
              <Route exact path="/pedidos/:id" component={PedidosCliente}/>
              <Route exact path="/panel" component={Panel}/>
              <Route exact path="/registro" render={() => <Registro session={session}/>}/>
              <Route exact path="/login" render={() => <Login  refetch={refetch} />}/>
            </Switch>
          </div>
        </Fragment>
      </Router>  
  )
}

const RootSession = Session(App);

export { RootSession };