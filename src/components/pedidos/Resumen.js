import React, { Fragment, Component } from 'react';
import Producto from './Producto';

class Resumen extends Component {    
    state = {
        productos: []
    }    

    render() {
        const productos = this.props.productos;
        if( productos.length === 0 ) return null;
        return (
            <Fragment>
                <h2 className="text-center mb-3">Resument y Cantidades</h2>
                <table className="table">
                    <thead className="bg-success text-light">
                        <tr className="font-weight-bold">
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Inventario</th>
                            <th>Cantidad</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto, index) => (
                            <Producto
                                key={producto.id}
                                id={producto.id}
                                producto={producto}
                                index={index}
                                actualizarCantidad={this.props.actualizarCantidad}
                                eliminarProducto={this.props.eliminarProducto}
                            />
                        ))}
                    </tbody>
                </table>

            </Fragment>
        );
    }
}

export default Resumen;