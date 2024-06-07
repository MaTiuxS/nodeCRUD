const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController.js');
const productosController = require('../controllers/productosController.js');
const pedidosController = require('../controllers/pedidosController.js');
module.exports = function () {
    
    /** CLIENTES */
    // Agrega nuevos clientes via POST
    router.post('/clientes', clienteController.nuevoCliente)

    // Obtener todos los clientes
    router.get('/clientes', clienteController.mostrarClientes );
    
    // Muestra un cliente en especifico por id
    router.get('/clientes/:idCliente', clienteController.mostrarCliente);
    
    // Actualizar cliente
    router.put('/clientes/:idCliente', clienteController.actualizarCliente);

    // elimnar cliente
    router.delete('/clientes/:idCliente', clienteController.eliminarCliente);

    /** PRODUCTOS */
    // Agregar producto
    router.post('/productos', 
        productosController.subirArchivo,    
        productosController.nuevoProducto);

    // mostrar producto
    router.get('/productos', productosController.mostrarProductos );

    // Mostrar producto con id
    router.get('/productos/:idProducto', productosController.mostrarProducto);

    // Actualizar productos
    router.put('/productos/:idProducto',
        productosController.subirArchivo,
        productosController.actualizarProducto
    );

    // Eliminar productos
    router.delete('/productos/:idProducto', productosController.eliminarProducto);
    
    /*** PEDIDOS */
    // Agrega nuevos pedidos
    router.post('/pedidos', pedidosController.nuevoPedido);

    // muestra los pedidos
    router.get('/pedidos', pedidosController.mostrarPedidos);

    // Mostrar un pedido por su id
    router.get('/pedidos/:idPedido', pedidosController.mostrarPedido );

    return router;
};