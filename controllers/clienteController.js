const Clientes = require('../models/Clientes');

// Agrega un nuevo cliente 
exports.nuevoCliente = async (req, res, next) => {
    const cliente = new Clientes(req.body);

    try {
        // Almacenar el registro
        await cliente.save();
        res.json({ mensaje: 'Se agrego un nuevo cliente'});
    } catch (error) {
        // si hay un error
        res.send(error);
        next();
    }
}

// Muestra todos los clientes 
exports.mostrarClientes = async (req, res, next) => {
    try {
        const clientes = await Clientes.find({});
        res.json(clientes);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Muestra un cliente por un id
exports.mostrarCliente = async( req, res, next ) => {
    if (req.params.idCliente.length <= 23 ) {
        res.json({ mensaje: "Este cliente no existe"});
        return next();
    }
    const cliente = await Clientes.findById(req.params.idCliente);

 
    try {
        if (!cliente ) {
            res.json({ mensaje: "Este cliente no existe"});
            return next();
        }

        // mostrar el cliente
        res.json(cliente);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Actualizar cliente por su id
exports.actualizarCliente = async (req, res, next ) => {
    try {
        const cliente = await Clientes.findOneAndUpdate({ _id : req.params.idCliente} , 
            req.body, {
                new: true
            }
        )
        res.json(cliente);
    } catch (error) {
        res.send(error);
        next();
    }
}

// Eliminar cliente con el id
exports.eliminarCliente = async (req, res, next ) => {
    
    if (req.params.idCliente.length <= 23) {
        res.json({ mensaje: "Este cliente no existe"});
        return next();
    }
    try {
        await Clientes.findOneAndDelete({_id: req.params.idCliente});
        res.json({mensaje: 'El cliente se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}