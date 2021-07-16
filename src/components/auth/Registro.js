import React, { Component, Fragment } from 'react';
import { NUEVO_USUARIO } from '../../mutations';
import { Mutation } from 'react-apollo';
import Error from '../alerts/Error';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

const initialState = {
	usuario: '',
	nombre: '',
	password: '',
	repetirPassword: '',
	rol: ''
}

class Registro extends Component {
	state = {
		...initialState
	}

	actualizarState = e => {
		const { name, value } = e.target;
		this.setState({
			[name] : value
		});
	}

	validadForm = () => {
		const {usuario, nombre, password, repetirPassword, rol} = this.state;
		const noValido = !usuario || !nombre || !password || !rol || !repetirPassword || password !== repetirPassword;
		return noValido;
	}

	limpiarState = () => {
		this.setState({
			...initialState
		})
	}

	crearRegistro = (e, crearUsuario) => {
		e.preventDefault();
		crearUsuario().then(data => {
			this.limpiarState();
			this.props.history.push('/login')
		})
	}

	render() {

		const { usuario, nombre, password, repetirPassword, rol } = this.state;
		const rolUsuario = this.props.session.getUsuario.rol;
		const redireccion = (rolUsuario !== 'ADMINISTRADOR') ? <Redirect to={'/clientes'}/> : '';
		return (
	        <Fragment>
	        	<h1 className="text-center mb-5">Nuevo Usuario</h1>
	        	<div className="row justify-content-center">
	        	<Mutation mutation={NUEVO_USUARIO}
	        		variables={{usuario, nombre, password, rol}}
	        	>	

	        		{(crearUsuario, {loading, error, data}) => {
	        			if (loading) return "Cargando...";
                    	if (error) return `Error: ${error.message}`;
                    	return (
			        		<form className="col-md-8"
			        			onSubmit={ e => this.crearRegistro(e, crearUsuario)}
			        		>
			        			{error && <Error error={error}/>}
			        			<div className="form-group">
			        				<label htmlFor="">Usuario</label>
			        				<input type="text"
			        				name="usuario"
			        				className="form-control"
			        				placeholder="Nombre de Usuario"
			        				onChange={this.actualizarState}
			        				value={usuario}
			        				/>
			        			</div>
			        			<small className="form-text text-muted">(Sin especio y sin caracteres especioles)</small>
			        			<div className="form-group">
			        				<label htmlFor="">Nombre</label>
			        				<input type="text"
			        				name="nombre"
			        				className="form-control"
			        				placeholder="Nombre Completo"
			        				onChange={this.actualizarState}
			        				value={nombre}
			        				/>
			        			</div>
			        			<small className="form-text text-muted">(Agrega el nombre y apellidos completos)</small>
			        			<div className="form-row">
				        			<div className="form-group col-md-6">
				        				<label htmlFor="">Password</label>
				        				<input type="password"
				        				name="password"
				        				className="form-control"
				        				placeholder="Password"
				        				onChange={this.actualizarState}
				        				value={password}
				        				/>
				        			</div>
				        			<div className="form-group col-md-6">
				        				<label htmlFor="">Repetir Password</label>
				        				<input type="password"
				        				name="repetirPassword"
				        				className="form-control"
				        				placeholder="Repetir Password"
				        				onChange={this.actualizarState}
				        				value={repetirPassword}
				        				/>
				        			</div>			        				
			        			</div>
			        			<div className="form-group">
			        				<label htmlFor="">Rol</label>
			        				<select 
				        				name="rol" 
				        				id="" 
				        				className="form-control"
				        				value={rol}
				        				onChange={this.actualizarState}
			        				>
			        					<option value="">Eligir...</option>
			        					<option value="ADMINISTRADOR">ADMINISTRADOR</option>
			        					<option value="VENDEDOR">VENDEDOR</option>
			        				</select>
			        			</div>
			        			<button 
			        			disabled={this.validadForm()}
			        			type="submit"
			        			className="btn btn-success float-right">
			        			Crear Usuario
			        			</button>
			        		</form>
                    	)
	        		}}
	        	</Mutation>
	        	</div>
	        </Fragment>
		)
	}
}

export default withRouter(Registro);