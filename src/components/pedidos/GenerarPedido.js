import React from 'react';
import { NUEVO_PEDIDO } from '../../mutations';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';


const validarPedido = (props) => {
	let noValido  = !props.productos || props.total <= 0;
	return noValido;
}

const GenerarPedido = (props) => {

    return (
    	<Mutation mutation={NUEVO_PEDIDO}
    	onCompleted={() => props.history.push('/clientes')}
    	>
    		{crearPedido => (
		    	<button
		    		type="buttom"
		    		className="btn btn-warning mt-4"
		    		disabled={validarPedido(props)}
		    		onClick={e => {
		    			const productosInput = props.productos.map(({nombre, precio,stock, ...object}) => object);
		    			const input = {
		    				pedido: productosInput,
		    				total: props.total,
		    				cliente: props.idCliente,
		    				idvendedor: props.idVendedor
		    			}
		    			crearPedido({
		    				variables:{input}
		    			})
		    		}}
		    		
		    	>Generar Pedido</button>
    		)}
    	</Mutation>
    );
}

export default withRouter(GenerarPedido);