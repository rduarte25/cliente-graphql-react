import React, { Component, Fragment } from 'react';
import DatosCliente from './DatosCliente';
import { Query } from 'react-apollo';
import { PRODUCTOS_QUERY } from '../../queries';
import '../../spinner.css';
import ContenidoProductos from './ContenidoProductos';
import { withRouter } from 'react-router-dom';

class NuevoPedido extends Component {
    state = {}
    render() {
        const { id } = this.props.match.params;

        const idVendedor = this.props.session.getUsuario.id;
        return (
            <Fragment>
                <h2 className="text-center">Nuevo Pedido</h2>
                <div className="row justify-content-center">
                    <div className="col-md-3">
                        <DatosCliente 
                            id={id}
                        />
                    </div>
                    <div className="col-md-9">
                        <Query query={PRODUCTOS_QUERY}
                        pollInterval={500}
                        variables={{stock: true}}
                        >
                             {({loading, error, data, startPolling, stopPolling}) => {
                                if (loading) return(
                                    <div className="spinner">
                                        <div className="rect1"></div>
                                        <div className="rect2"></div>
                                        <div className="rect3"></div>
                                        <div className="rect4"></div>
                                        <div className="rect5"></div>
                                    </div>
                                );
                                if (error) return `Error: ${error.message}`;
                                return (
                                    <ContenidoProductos 
                                        productos={data.getProductos}
                                        id={id}
                                        idVendedor={idVendedor}
                                    />
                                )
                            }}

                        </Query>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default withRouter(NuevoPedido);