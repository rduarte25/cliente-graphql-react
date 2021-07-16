import React, { Fragment } from 'react';

const ResumenProducto = (props) => {
	const {nombre, precio, stock} = props.producto;
	const { cantidad } = props.cantidad;
    return (
    	<Fragment>
    		<div className="contenedor-producto mb-4 p-4">
    			<p className="card-text font-weight-bold">
    				Nombre del Producto: 
    				<span className="font-weight-normal">{nombre}</span>
    			</p>
    			<p className="card-text font-weight-bold">
    				Cantidad: 
    				<span className="font-weight-normal">{cantidad}</span>
    			</p>
    			<p className="card-text font-weight-bold">
    				Precio Unitario: 
    				<span className="font-weight-normal">$ {precio}</span>
    			</p>
    		</div>
    	</Fragment>
    );
}

export default ResumenProducto;