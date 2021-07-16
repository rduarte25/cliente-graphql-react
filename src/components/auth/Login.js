import React, { Component, Fragment } from 'react';
import { AUTENTICAR_USUARIO } from '../../mutations';
import { Mutation } from 'react-apollo';
import Error from '../alerts/Error';
import { withRouter } from 'react-router-dom';
import LocalStorage from 'localstorage';

const initialState = {
	usuario: '',
	password: '',
}

class Login extends Component {
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
		const {usuario, password} = this.state;
		const noValido = !usuario || !password
		return noValido;
	}

	limpiarState = () => {
		this.setState({
			...initialState
		})
	}

	authUsuario = (e, autenticarUsuario) => {
		e.preventDefault();
		autenticarUsuario().then(async ({data}) => {
			localStorage.setItem('token', data.autenticarUsuario.token);
			await this.props.refetch();
			this.limpiarState();
			setTimeout(() => {
				this.props.history.push('/panel');
			}, 3000)
		})
	}

	render() {
		const { usuario, password } = this.state;
		return (
	        <Fragment>
	        	<h1 className="text-center mb-5">Iniciar Sesión</h1>
	        	<div className="row justify-content-center">
	        	<Mutation mutation={AUTENTICAR_USUARIO}
	        		variables={{usuario, password}}
	        		//onCompleted={() => this.props.refetch().then(() => {
                    //    this.props.history.push('/')
                    //})}
	        	>	

	        		{(autenticarUsuario, {loading, error, data}) => {
	        			if (loading) return "Cargando...";
                    	if (error) return `Error: ${error.message}`;
                    	return (
			        		<form className="col-md-8"
			        			onSubmit={ e => this.authUsuario(e, autenticarUsuario)}
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
			        			<div className="form-group">
			        				<label htmlFor="">Password</label>
			        				<input type="password"
			        				name="password"
			        				className="form-control"
			        				placeholder="Password"
			        				onChange={this.actualizarState}
			        				value={password}
			        				/>
			        			</div>
			        			<button 
			        			disabled={loading || this.validadForm()}
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

export default withRouter(Login);