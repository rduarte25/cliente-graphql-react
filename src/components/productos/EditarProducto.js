import React, { Component, Fragment } from 'react';
import { PRODUCTO_QUERY } from '../../queries';
import { Query } from 'react-apollo';
import FormularioEditarProducto from './FormularioEditarProducto';



class EditarProducto extends Component {
    state = {}
    render() {
        const { id } = this.props.match.params;
        
        return (
            <Fragment>
                <h2 className="text-center">Editar Producto</h2>
                <div className="row justify-content-center">
                    <Query query={PRODUCTO_QUERY} variables={{id}}>
                        {({loading, error, data, startPolling, stopPolling, refetch}) => {
                            if (loading) return "Cargando...";
                            if (error) return `Error: ${error.message}`;
                            return (
                                <FormularioEditarProducto 
                                    producto={data.getProducto}
                                    refetch={refetch}
                                    id={data.getProducto.id}
                                />
                            )
                        }}
                    </Query>
                </div>
            </Fragment>
        );
    }
}

export default EditarProducto;