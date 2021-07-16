import React, { Component, Fragment } from 'react';
import { NUEVO_PRODUCTO } from '../../mutations';
import { Mutation } from 'react-apollo';

const initialState = {
    producto: {
        nombre : '',
        precio: 0,
        stock: 0
    },
    error : false,
}

class NuevoProducto extends Component {
    state = { 
        ...initialState
    }

    clanState = () => {
        this.setState({
            ...initialState
        })
    }

    actualizarState = e => {
        const {name, value} = e.target;
        this.setState({
            producto: {
                ...this.state.producto,
                [name] : value
            }            
        })
    }

    validarForm = () => {
        const {nombre, precio, stock} = this.state.producto;
        const noValido = !nombre || !precio || !stock;
        return noValido;
    }

    crearNuevoProducto = (e, crearProducto) => {
        e.preventDefault();        
        crearProducto().then( data => {
            // console.log(data)
            this.clanState();
        } )
    }

    render() {
        const { error } = this.state;
        let response = (error) ? <p className="alert alert-danger p-3 text-center">Todos los campos son obligatorios</p> : '';
        const {nombre, precio, stock} = this.state.producto;
        const input = {
            nombre,
            precio : Number(precio),
            stock : Number(stock)
        }
        return (
            <Fragment>
                <h2 className="text-center">Nuevo Producto</h2>
                {response}
                <div className="row justify-content-center">
                    <Mutation mutation={NUEVO_PRODUCTO}
                              onCompleted={() => this.props.history.push('/productos')}
                              variables={{input}}
                        >
                        {(crearProducto,{loading, error, data} ) => {
                            return (
                                <form className="col-md-8 m-3" 
                                    onSubmit= {e => this.crearNuevoProducto(e, crearProducto)}
                                >
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label >Nombre</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                name="nombre" 
                                                id="nombre" 
                                                aria-describedby="nombre" 
                                                placeholder="Nombre"
                                                onChange={this.actualizarState}
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label >Precio</label>
                                            <input type="number" 
                                            className="form-control" 
                                            name="precio" 
                                            id="precio" 
                                            aria-describedby="precio"
                                            placeholder="Precio"
                                            onChange={this.actualizarState}/>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <label >Stock</label>
                                            <input type="number" 
                                            className="form-control" 
                                            name="stock" id="stock" 
                                            aria-describedby="stock" 
                                            placeholder="Stock"
                                            onChange={this.actualizarState}/>
                                        </div>
                                        
                                    </div>
                                    <button type="submit" disabled={this.validarForm()} className="btn btn-success float-right">Agregar Producto</button>
                                </form>
                            )}}
                    </Mutation>
                </div>
            </Fragment>
        );
    }
}

export default NuevoProducto;