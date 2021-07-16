import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import { CLIENTES_QUERY } from '../../queries'
import { ELIMINAR_CLIENTE } from '../../mutations';
import { Mutation } from 'react-apollo';
import Paginador from '../Paginador';
import Exito from '../alerts/Exito';


class Clientes extends Component {

    limite = 2;

    state = {
        paginador : {
            offset : 0,
            actual : 1
        },
        alert : {
            mostrar : false,
            message : ''
        }
    }
    paginaAnterior = () => {
        this.setState({
            paginador: {
                offset : this.state.paginador.offset - this.limite,
                actual : this.state.paginador.actual - 1
            }
        })
    }
    paginaSiguiente = () => {
        this.setState({
            paginador: {
                offset : this.state.paginador.offset + this.limite,
                actual : this.state.paginador.actual + 1
            }
        })
    }
    render() {
        const {alert : {mostrar, message} } = this.state;

        let alert = (mostrar) ? <Exito message={message}/> : '';

        let id;
        const { rol } = this.props.session.getUsuario;

        if ( rol === "VENDEDOR") {
            id = this.props.session.getUsuario.id;
        } else {
            id = '';
        }

        return (
            <Query query={CLIENTES_QUERY}
            pollInterval={500}
            variables={{limit: this.limite,
                        offset: this.state.paginador.offset,
                        idvendedor: id}}
            >
                {({loading, error, data, startPolling, stopPolling}) => {
                    if (loading) return "Cargando...";
                    if (error) return `Error: ${error.message}`;
                    return (
                        <Fragment>
                            <h2 className="text-center">Listado Clientes</h2>
                            {alert}
                            <ul className="list-group mt-4">
                                {data.getClientes.map(item => {
                                    const { id } = item;
                                    return (
                                    <li key={item.id} className="list-group-item">
                                        <div className="row justify-content-between align-item-center">
                                            <div className="col-md-6 d-flex justify-content-between align-item-center">
                                                {item.nombre} {item.apellido} - {item.empresa}
                                            </div>
                                            <div className="col-md-6 d-flex justify-content-end">
                                                <Link className="btn btn-primary d-block d-md-inline-block mr-2" to={`/pedidos/${item.id}`}>Ver Pedidos</Link>
                                                <Link className="btn btn-warning d-block d-md-inline-block mr-2" to={`/pedidos/nuevo/${item.id}`}>&#43; Nuevo Pedido</Link>
                                                <Link className="btn btn-success d-block d-md-inline-block mr-2" to={`/clientes/editar/${item.id}`}>Editar Cliente</Link>
                                                <Mutation
                                                    mutation={ELIMINAR_CLIENTE}
                                                    onCompleted={(data) => {
                                                        this.setState({
                                                            alert: {
                                                                mostrar : true,
                                                                message : data.eliminarCliente
                                                            }
                                                        }, () => {
                                                            setTimeout(() => {
                                                                this.setState({
                                                                    alert: {
                                                                        mostrar : false,
                                                                        message : ''
                                                                    }
                                                                })
                                                            }, 3000)
                                                        })
                                                    } }
                                                >
                                                    {eliminarCliente => (
                                                        <button onClick={ () => {
                                                            if (window.confirm('¿Estas seguro de eliminar este cliente?')) {
                                                                eliminarCliente({
                                                                    variables:{id}
                                                                })
                                                            }                                                
                                                        }} type="buttom" className="btn btn-danger float-right" >&times; Eliminar</button>
                                                    )}                                            
                                                </Mutation>
                                            </div>
                                        </div>                                
                                    </li>
                                )})}
                            </ul>
                            <Paginador 
                                actual={this.state.paginador.actual}
                                total={data.totalClientes}
                                limite={this.limite}
                                paginaAnterior={this.paginaAnterior}
                                paginaSiguiente={this.paginaSiguiente}
                            />
                        </Fragment>                
                    )
                }}
            </Query>
        )
    }
}

export default Clientes;