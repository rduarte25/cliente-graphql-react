import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import { PRODUCTOS_QUERY } from '../../queries';
import { ELIMINAR_PRODUCTO } from '../../mutations';
import { Mutation } from 'react-apollo';
import Paginador from '../Paginador';
import Exito from '../alerts/Exito';


class Productos extends Component {

    limite = 3;

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

        return (
            <Fragment>
                <h2 className="text-center">Listado Productos</h2>
                {alert}
                <Query query={PRODUCTOS_QUERY}
                    pollInterval={500}
                    variables={{limit: this.limite, offset: this.state.paginador.offset}}
                    >
                        {({loading, error, data, startPolling, stopPolling}) => {
                            if (loading) return "Cargando...";
                            if (error) return `Error: ${error.message}`;
                            return (
                                <Fragment>
                                    <table className="table">
                                        <thead>
                                            <tr className="table-primary">
                                                <th  scope="col">Nombre</th>
                                                <th  scope="col">Precio</th>
                                                <th  scope="col">Existecia</th>
                                                <th  scope="col">Eliminar</th>
                                                <th  scope="col">Editar</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.getProductos.map(item => {
                                                const { id } = item;
                                                const { stock } = item
                                                let clase;
                                                if ( stock < 10 ) { 
                                                    clase = 'bg-danger text-light';
                                                } else if ( stock >= 10 && stock < 20 ) { 
                                                    clase = 'bg-warning text-light';
                                                } else if (stock > 20) {
                                                    clase = 'bg-success text-light';
                                                };
                                                return (
                                                    <tr className={clase} key={id}>
                                                        <td>{item.nombre}</td>
                                                        <td>{item.precio}</td>
                                                        <td>{item.stock}</td>
                                                        <td><Mutation
                                                                mutation={ELIMINAR_PRODUCTO}
                                                                onCompleted={(data) => {
                                                                    this.setState({
                                                                        alert: {
                                                                            mostrar : true,
                                                                            message : data.eliminarProducto
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
                                                            {eliminarProducto => (
                                                                <button onClick={ () => {
                                                                    if (window.confirm('¿Estas seguro de eliminar este producto?')) {
                                                                        eliminarProducto({
                                                                            variables:{id}
                                                                        })
                                                                    }                                                
                                                                }} type="buttom" className="btn btn-danger float-right" >&times; Eliminar</button>
                                                            )}                                            
                                                        </Mutation></td>
                                                        <td><Link className="btn btn-success d-block d-md-inline-block mr-2" to={`/productos/editar/${item.id}`}>Editar Producto</Link></td>
                                                    </tr>
                                                )
                                                
                                            })}
                                        </tbody>
                                    </table>
                                    <Paginador 
                                        actual={this.state.paginador.actual}
                                        total={data.totalProductos}
                                        limite={this.limite}
                                        paginaAnterior={this.paginaAnterior}
                                        paginaSiguiente={this.paginaSiguiente}
                                    />
                                </Fragment>
                            )
                        }}                    
                </Query>
                
            </Fragment>  
        );
    }
}

export default Productos;