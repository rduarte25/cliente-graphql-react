import React, { Component, Fragment } from 'react';
import { NUEVO_CLIENTE } from '../../mutations';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

class NuevoCliente extends Component {
    state = { 
        cliente: {
            nombre : '',
            apellido : '',
            empresa : '',
            emails : [],
            edad : '',
            tipo : ''
        },
        error : false,
        emails: []
    }

    nuevoCampo = (e) => {
        e.preventDefault();
        this.setState({
            emails : this.state.emails.concat([{email : ''}])
        });
    }
    quitarCampo = i => (e) => {
        e.preventDefault();
        this.setState({
            emails: this.state.emails.filter((email, index) => i !== index)
        })
        
    }
    leerCampo = i => e => {
        const nuevoEmail = this.state.emails.map((email,index) => {
            if( i !== index ) return email;
            return {
                ...email,
                email: e.target.value
            }
        });
        this.setState({
            emails: nuevoEmail
        })
    }
    render() {
        //console.log(this.props.session.getUsuario.id);
        const idVendedor = this.props.session.getUsuario.id;
        const { error } = this.state;
        let response = (error) ? <p className="alert alert-danger p-3 text-center">Todos los campos son obligatorios</p> : '';
        return (
            <Fragment>
                <h2 className="text-center">Nuevo Cliente</h2>
                {response}
                <div className="row justify-content-center">
                    <Mutation mutation={NUEVO_CLIENTE}
                            onCompleted={() => this.props.history.push('/clientes')}
                        >
                        {crearCliente => (
                            <form className="col-md-8 m-3" 
                                onSubmit= {e => {
                                    e.preventDefault();
                                    const {nombre, apellido, empresa, edad, tipo} = this.state.cliente;

                                    const {emails} = this.state

                                    if (nombre === '' || apellido === '' || empresa === '' || edad === '' || tipo === '') {
                                        this.setState({
                                            error: true
                                        });
                                        return
                                    }
                                    this.setState({
                                        error: false
                                    })

                                    const input = {
                                        nombre,
                                        apellido,
                                        empresa,
                                        emails, 
                                        edad : Number(edad),
                                        tipo,
                                        idvendedor : idVendedor
                                    }
                                    crearCliente({
                                        variables: {input}
                                    })
                                }}
                            >
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label >Nombre</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            name="nombre" 
                                            id="nombre" 
                                            aria-describedby="helpId" 
                                            placeholder="Nombre"
                                            onChange={e =>{
                                                this.setState({
                                                    cliente: {
                                                        ...this.state.cliente,
                                                        nombre : e.target.value
                                                    }
                                                })
                                            }}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label >Apellido</label>
                                        <input type="text" className="form-control" name="apellido" id="apellido" aria-describedby="helpId" placeholder="Apellido" onChange={e =>{
                                                this.setState({                                            
                                                    cliente: {
                                                        ...this.state.cliente,
                                                        apellido : e.target.value
                                                    }
                                                })
                                            }}/>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label >Empresa</label>
                                        <input type="text" className="form-control" name="empresa" id="empresa" aria-describedby="helpId" placeholder="Empresa"
                                        onChange={e =>{
                                            this.setState({                                        
                                                cliente: {
                                                    ...this.state.cliente,
                                                    empresa : e.target.value
                                                }
                                            })
                                        }}/>
                                    </div>
                                    {this.state.emails.map((input, index) => (
                                        <div key={index} className="form-group col-md-12">
                                            <label >Correo: {index + 1}</label>
                                            <div className="input-group">
                                                <input type="email" className="form-control" name="email" id="email" aria-describedby="helpId" placeholder="Email"
                                                onChange={this.leerCampo(index)}/>
                                                <div className="input-group-append">
                                                    <button onClick={this.quitarCampo(index)} type="buttom" className="btn btn-danger float-right" >&times; Eliminar</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="form-group d-flex justify-content-center col-md-12">
                                        <button onClick={this.nuevoCampo} type="buttom" className="btn btn-warning float-right" >Agregar Email</button>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label >Edad</label>
                                        <input type="number" 
                                        className="form-control" 
                                        name="edad" 
                                        id="edad" 
                                        aria-describedby="helpId" 
                                        placeholder="Edad"
                                        onChange={e =>{
                                            this.setState({                                        
                                                cliente: {
                                                    ...this.state.cliente,
                                                    edad : e.target.value
                                                }
                                            })
                                        }}/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label >Tipo Cliente</label>
                                        <select className="form-control" name="tipo" id="tipo"
                                        onChange={e =>{
                                            this.setState({                                        
                                                cliente: {
                                                    ...this.state.cliente,
                                                    tipo : e.target.value
                                                }
                                            })
                                        }}>
                                            <option value="">Elegir...</option>
                                            <option value="PREMIUM">PREMIUM</option>
                                            <option value="BASICO">BASICO</option>
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-success float-right">Agregar Cliente</button>
                            </form>                            
                        )}
                    </Mutation>
                </div>
            </Fragment>
        );
    }
}

export default withRouter(NuevoCliente);