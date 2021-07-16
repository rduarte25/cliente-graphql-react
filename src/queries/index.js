import gql from 'graphql-tag'

export const CLIENTES_QUERY = gql `
query getClientes($limit: Int, $offset: Int, $idvendedor: String) {
    getClientes(limit: $limit, offset: $offset, idvendedor: $idvendedor) {
        id
        nombre
        apellido
        empresa
        emails {
            email
        }
    }
    totalClientes(idvendedor : $idvendedor)
}
`;

export const CLIENTE_QUERY = gql `
query ConsultarCliente($id:ID!) {
    getCliente(id: $id) {
        id
        nombre
        apellido
        empresa
        emails {
            email
        }
        edad
        tipo
    }    
}`;

// Productos
export const PRODUCTOS_QUERY = gql `
query getProductos($limit: Int, $offset: Int, $stock: Boolean) {
    getProductos(limit: $limit, offset: $offset, stock: $stock) {
        id
        nombre
        precio
        stock
    }
    totalProductos
}
`;

export const PRODUCTO_QUERY = gql `
query ConsultarProducto($id:ID!) {
    getProducto(id: $id) {
        id
        nombre
        precio
        stock
    }    
}`;

// Pedidos

export const PEDIDOS_QUERY = gql ` 
query getPedidos( $cliente: ID ) {
    getPedidos( cliente: $cliente ) {
        id
        total
        fecha
        estado
        pedido {
            id
            cantidad
        }
    }
}`;

export const TOP_CLIENTES = gql `
query topClientes {
    topClientes {
        total
        cliente {
            nombre
        }
    }
}`;

export const TOP_VENDEDORES = gql `
query topVendedores {
    topVendedores {
        total
        usuario {
            nombre
        }
    }
}`;

//Usuarios
export const USUARIO_ACTUAL = gql ` 
query getUsuario {
    getUsuario {
        id
        usuario
        nombre
        rol
    }
}`;