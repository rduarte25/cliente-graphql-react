import React, { Component } from 'react';
import { ACTUALIZAR_PRODUCTO } from '../../mutations';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

const initialState = {
    producto: {
        nombre : '',
        precio: 0,
        stock: 0
    },
    error : false,
}

class FormularioEditarProducto extends Component {
    state = { 
        producto : this.props.producto,
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

    actualizarProducto = (e, actualizarProducto) => {
        e.preventDefault();        
        actualizarProducto().then( data => {
            // console.log(data)
            this.clanState();
        } )
    }

    render() {
        const {nombre, precio, stock} = this.state.producto;
        const { error } = this.state;
        const { id } = this.props;
        let response = (error) ? <p className="alert alert-danger p-3 text-center">Todos los campos son obligatorios</p> : '';
        const input = {
            id,
            nombre,
            precio : Number(precio),
            stock : Number(stock)
        }
        return (
            
            <Mutation 
                mutation={ACTUALIZAR_PRODUCTO}
                variables={{input}}
                key={id}
                onCompleted={() => this.props.refetch().then(() => {
                    this.props.history.push('/productos')
                })}
            >
                
                {(actualizarProducto,{loading, error, data}) => {
                    return(
                    <form className="col-md-8 m-3"
                            onSubmit= {e => this.actualizarProducto(e, actualizarProducto)}
                    
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
                                    defaultValue={nombre}
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
                                defaultValue={precio}
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
                                defaultValue={stock}
                                onChange={this.actualizarState}/>
                            </div>
                            
                        </div>
                        <button type="submit" disabled={this.validarForm()} className="btn btn-success float-right">Guardar Cambios </button>
                    </form>
                    )
                }}
            </Mutation>
        )
    }
}

export default withRouter(FormularioEditarProducto);