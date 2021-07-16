import React, { Fragment } from 'react';
import { TOP_CLIENTES } from '../../queries';
import { Query } from 'react-apollo';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Clientes = () => {

	return (
	        <Query query={TOP_CLIENTES}>
	        	{({loading, error, data, startPolling, stopPolling}) => {
                    if (loading) return "Cargando...";
                    if (error) return `Error: ${error.message}`;
                    const topClinetesGrafica = [];
                    data.topClientes.map((pedido, index) => {
                    	topClinetesGrafica[index] = {
                    		...pedido.cliente[0],
                    		total: pedido.total
                    	}
                    })
                    return (
                    	<BarChart width={900} height={300} data={topClinetesGrafica} 
                    		margin={{top: 5, right: 30, left: 20, bottom: 5}}
                    	>
                    		<CartesianGrid strokeDasharray="3 3"/>
                    		<XAxis dataKey="nombre"/>
                    		<YAxis />
                    		<Tooltip />
                    		<Bar dataKey="total" fill="#10a98b"/>
                    	</BarChart>
                    )

	        	}}
	        </Query>
	    )
}

export default Clientes;