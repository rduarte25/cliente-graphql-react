import React, { Component } from 'react';
import { ACTUALIZAR_CLIENTE } from '../../mutations';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

class FormularioEditarCliente extends Component {
    state = { 
        cliente : this.props.cliente,
        emails: this.props.cliente.emails
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
        const {nombre, apellido, empresa, edad, tipo} = this.state.cliente;
        const { emails } = this.state;
        return (
            <Mutation mutation={ACTUALIZAR_CLIENTE}
                    onCompleted={() => this.props.refetch().then(() => {
                        this.props.history.push('/clientes')
                    })}
            >
                {actualizarCliente => (
                    <form className="col-md-8 m-3"
                            onSubmit= {e => {
                                e.preventDefault();
                                const {id, nombre, apellido, empresa, edad, tipo} = this.state.cliente;
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
                                    id,
                                    nombre,
                                    apellido,
                                    empresa,
                                    emails, 
                                    edad : Number(edad),
                                    tipo
                                }
                                actualizarCliente({
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
                                    defaultValue={nombre}
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
                                <input type="text" 
                                className="form-control" 
                                name="apellido" 
                                id="apellido" 
                                aria-describedby="helpId" 
                                placeholder="Apellido" 
                                defaultValue={apellido}
                                onChange={e =>{
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
                                defaultValue={empresa}
                                onChange={e =>{
                                    this.setState({
                                        cliente: {
                                            ...this.state.cliente,
                                            empresa : e.target.value
                                        }
                                    })
                                }}
                                />
                            </div>
                            {emails.map((input, index) => (
                                <div key={index} className="form-group col-md-12">
                                    <label >Correo: {index + 1}</label>
                                    <div className="input-group">
                                        <input type="email" className="form-control" name="email" id="email" aria-describedby="helpId" placeholder="Email"
                                        onChange={this.leerCampo(index)}
                                        defaultValue={input.email} />
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
                                defaultValue={edad}
                                onChange={e =>{
                                    this.setState({
                                        cliente: {
                                            ...this.state.cliente,
                                            edad : e.target.value
                                        }
                                    })
                                }}
                            />
                            </div>
                            <div className="form-group col-md-6">
                                <label >Tipo Cliente</label>
                                <select className="form-control" name="tipo" id="tipo"
                                value={tipo}
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
                        <button type="submit" className="btn btn-success float-right">Guardar Cambios</button>
                    </form>
                )}
            </Mutation>
        )
    }
}

export default withRouter(FormularioEditarCliente);