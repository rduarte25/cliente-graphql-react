import gql from 'graphql-tag';

export const NUEVO_CLIENTE = gql `
mutation crearCliente($input: clienteInput) {
    crearCliente(input: $input) {
        id
        nombre
        apellido
    }
}`;

export const ACTUALIZAR_CLIENTE = gql `
mutation actualizarCliente($input: clienteInput) {
    actualizarCliente(input: $input) {
        id
        nombre
        apellido
        edad
        empresa
        tipo
        emails {
            email
        }
    }
}`;

export const ELIMINAR_CLIENTE = gql `
mutation eliminarCliente($id: ID!) {
    eliminarCliente(id: $id)
}`;

//Productos
export const NUEVO_PRODUCTO = gql `
mutation crearProducto($input: productoInput) {
    crearProducto(input: $input) {
        id
        nombre
        precio
    }
}`;

export const ACTUALIZAR_PRODUCTO = gql `
mutation actualizarProducto($input: productoInput) {
    actualizarProducto(input: $input) {
        id
        nombre
        precio
        stock
    }
}`;

export const ELIMINAR_PRODUCTO = gql `
mutation eliminarProducto($id: ID!) {
    eliminarProducto(id: $id)
}`;

//Pedidos
export const NUEVO_PEDIDO = gql `
mutation crearPedido($input: pedidoInput) {
    crearPedido(input: $input) {
        id
    }
}`;

export const ACTUALIZAR_PEDIDO = gql `
mutation actualizarPedido($input: pedidoInput) {
    actualizarPedido(input: $input) {
        id
    }
}`;

export const NUEVO_USUARIO = gql ` 
mutation crearUsuario($usuario : String!, $nombre : String!, $password : String!, $rol: String!) {
    crearUsuario(usuario : $usuario, nombre : $nombre, password : $password, rol : $rol) 
}`;

export const AUTENTICAR_USUARIO = gql ` 
mutation autenticarUsuario($usuario : String!, $password : String!) {
    autenticarUsuario(usuario : $usuario, password : $password) {
        token
    }
}`;