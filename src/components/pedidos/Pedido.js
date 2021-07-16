import React from 'react';
import { PRODUCTO_QUERY } from '../../queries';
import { Query } from 'react-apollo';
import ResumenProducto from './ResumenProducto';
import { ACTUALIZAR_PEDIDO } from '../../mutations';
import { Mutation } from 'react-apollo';

import '../../pedidos.css'; 

const Pedido = (props) => {
	const {pedido} = props;
	const { id } = pedido;
	const { estado } = pedido;
	let clase;
	if ( estado === 'PENDIENTE' ) {
		clase = 'border-light';
	} else if ( estado === 'CANCELADO' ) {
		clase = 'border-danger';
	} else {
		clase = 'border-success';
	}
	const fecha = new Date(Number(pedido.fecha));
    return (
        <div className="col-md-4">
        	<div className={`card mb-3 ${clase}`}>
        		<div className="card-body">
        			<p className="card-text font-weight-bold">Estado:
        				<Mutation
        					mutation={ACTUALIZAR_PEDIDO}
        				>
        					{actualizarPedido => (
		        				<select 
		        					name="estado" 
		        					id="estado" 
		        					className="form-control my-3"
		        					value={pedido.estado}
		        					onChange={e => {
		        						const input = {
		        							id,
		        							pedido: pedido.pedido,
		        							fecha: pedido.fecha,
		        							total: pedido.total,
		        							cliente: props.cliente,
		        							estado: e.target.value
		        						}
		        						actualizarPedido({
		        							variables:{input}
		        						})
		        					}}
		        					>
		        					<option value="PENDIENTE">PENDIENTE</option>
		        					<option value="COMPLETADO">COMPLETADO</option>
		        					<option value="CANCELADO">CANCELADO</option>
		        				</select>
		        			)}
        				</Mutation> 
        			</p>
        			<p className="card-text font-weight-bold">Pedido ID: <span className="font-weight-normal">{pedido.id}</span></p>
        			<p className="card-text font-weight-bold">Fecha Pedido: <span className="font-weight-normal">{fecha.toLocaleString("es-VE")}</span></p>
        			
        			<h3 className="card-text text-center mb-3 resalter-text">Articulos del Pedido</h3>
        			{pedido.pedido.map((item, index) => {
        				const id =item.id
        				return (
		        			<Query query={PRODUCTO_QUERY}
				        		pollInterval={500}
				            	variables={{id}}
				            	key={item.id + index}
				        		>
					        	{({loading, error, data, startPolling, stopPolling, refetch}) => {
			                        if (loading) return "Cargando...";
			                        if (error) return `Error: ${error.message}`;
			                        
			                        return (
			                            <ResumenProducto 
			                            	producto={data.getProducto}
			                            	cantidad={item.cantidad}
			                            	key={item.id}
			                            />
			                        )
			                    }}
				            </Query>
			            )
        			})}
        			<div className="d-flex align-items-center justify-content-end">
        				<p className="card-text resaltar-text mr-1 bg-amarillo">Tatal:</p>
        				<p className="font-weight-normal inc-text">$ {pedido.total}</p>
        			</div>
        		</div>
        	</div>
        </div>
    );
}

export default Pedido;