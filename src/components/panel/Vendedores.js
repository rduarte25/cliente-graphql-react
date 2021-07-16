import React, { Fragment } from 'react';
import { TOP_VENDEDORES } from '../../queries';
import { Query } from 'react-apollo';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Vendedores = () => {

	return (
	        <Query query={TOP_VENDEDORES}>
	        	{({loading, error, data, startPolling, stopPolling}) => {
                    if (loading) return "Cargando...";
                    if (error) return `Error: ${error.message}`;
                    const topVendedoresGrafica = [];
                    data.topVendedores.map((pedido, index) => {
                    	topVendedoresGrafica[index] = {
                    		...pedido.usuario[0],
                    		total: pedido.total
                    	}
                    })
                    return (
                    	<BarChart width={900} height={300} data={topVendedoresGrafica} 
                    		margin={{top: 5, right: 30, left: 20, bottom: 5}}
                    	>
                    		<CartesianGrid strokeDasharray="3 3"/>
                    		<XAxis dataKey="nombre"/>
                    		<YAxis />
                    		<Tooltip />
                    		<Bar dataKey="total" fill="#6148b9"/>
                    	</BarChart>
                    )

	        	}}
	        </Query>
	    )
}

export default Vendedores;