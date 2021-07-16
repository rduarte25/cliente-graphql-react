import React, { Fragment, Component } from 'react';
import { render } from 'react-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Resumen from './Resumen';
import GenerarPedido from './GenerarPedido';
import Error from '../alerts/Error';


class ContenidoProductos extends Component {    
    state = {
        productos: [],
        total: 0
    }

    selectProducto = (productos) => {
        this.setState({
            productos
        })
    }

    actualizarTotal = () => {
        const productos = this.state.productos;
        let nuevoTotal = 0;
        if ( productos.length === 0 ) {
            this.setState({
                total: nuevoTotal
            })
            return;
        }        

        productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio))
        
        this.setState({
            productos,
            total: nuevoTotal
        })
    }

    actualizarCantidad = (cantidad, index) => {
        const productos = this.state.productos;
        productos[index].cantidad = Number(cantidad);
        this.setState({
            productos,
        }, () => {
            this.actualizarTotal()
        })
        
    }

    eliminarProducto = (id) => {
        const productos = this.state.productos;
        const productosRestantes = productos.filter(producto => producto.id !== id );
        this.setState({
            productos: productosRestantes
        }, () => {
            this.actualizarTotal()
        })
    }

    render() {
        const message = (this.state.total < 0) ? <Error error="Las cantidades no pueden ser negativas"/> : '';
        return (
            <Fragment>
                <h2 className="text-center mb-3">Seleccionar Articulos</h2>
                {message}
                <Select 
                    onChange={this.selectProducto}
                    options={this.props.productos}
                    isMulti={true}
                    components={makeAnimated()}
                    placeholder={'Seleccionar Productos'}
                    getOptionValue={(options) => options.id}
                    getOptionLabel={(options) => options.nombre} 
                    value={this.state.productos}                  
                />
                <Resumen 
                    productos={this.state.productos}
                    actualizarCantidad={this.actualizarCantidad}
                    eliminarProducto={this.eliminarProducto}
                />
                <p className="font-weight-bold float-right mt-3">Total <span className="font-weight-normal">
                ${this.state.total}</span></p>
                <GenerarPedido 
                    productos={this.state.productos}
                    total={this.state.total}
                    idCliente={this.props.id}
                    idVendedor={this.props.idVendedor}
                />
            </Fragment>
        );
    }
}

export default  ContenidoProductos;