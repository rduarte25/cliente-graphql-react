import React, { Fragment } from 'react';
import { PEDIDOS_QUERY } from '../../queries';
import { Query } from 'react-apollo';
import Pedido from './Pedido';

const PedidosCliente = (props) => {
	const cliente = props.match.params.id;
    return (
        <Fragment>
        	<h1 className="text-center mb-5">Pedidos del Cliente</h1>
        	<div className="row">
	        	<Query query={PEDIDOS_QUERY}
	        		pollInterval={500}
	            	variables={{cliente}}
	        		>
			        	{({loading, error, data, startPolling, stopPolling, refetch}) => {
	                        if (loading) return "Cargando...";
	                        if (error) return `Error: ${error.message}`;
	                        return (
                                data.getPedidos.map(pedido => (
                                    <Pedido 
                                    	key={pedido.id}
                                    	pedido={pedido}
                                    	cliente={cliente}
                                    />
                                ))	                            
	                        )
	                    }}      		
	                    
	        	</Query>

        	</div>
        </Fragment>    
    );
}

export default PedidosCliente;