import React from 'react';
import { Link } from 'react-router-dom';

const BotonRegistro = ({session}) => {
	const { rol } = session.session.getUsuario;
	if ( rol !== 'ADMINISTRADOR') return null;
	return (
		<Link
			to={`/registro`}
			className="btn btn-danger ml-md-2 mt-2 mt-md-0"
		>Crear Usuarios</Link>
	);
}

export default BotonRegistro;