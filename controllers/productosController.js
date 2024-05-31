const Productos = require("../models/Productos");
const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Formato no válido'))
        }
    }
}

// Pasar la configiguración y el campo
const upload = multer(configuracionMulter).single('imagen');

// Sube un archivo
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            res.json({ mensaje: error })
        }
        return next();
    })
}


// Agrega nuevos productos
exports.nuevoProducto = async (req, res, next ) => {
  
    const producto = new Productos(req.body);

    try {
  
        if (req.file.filename) {
            producto.imagen = req.file.filename;
        }
  
        await producto.save();
        res.send({ mensaje: 'Se agrego el producto'});
    } catch (error) {
        console.log(error);
        next();
    }
}

// Mostrar productos
exports.mostrarProductos = async (req, res, next) => {

    try {
        const pedidos = await Productos.find({});
        res.json(pedidos);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Mostrar producto con id
exports.mostrarProducto = async (req, res, next) => {
    if (req.params.idProducto.length <= 23 ) {
        res.json({ mensaje: "Este producto no existe"});
        return next();
    }
    const producto = await Productos.findById(req.params.idProducto);

    if (!producto) {
        res.json({mensaje: "Ese producto no existe"});
        return next();
    }

    try {
        res.json(producto);

    } catch (error) {
        console.log(error);
        next();
    }

}

// Actualizar producto
exports.actualizarProducto = async (req, res, next) => {
    
    try {
        
        // construir nuevo proudcto
        let nuevoProducto = req.body;

        // verificar si hay imagen nuevo
        if (req.file) {
            nuevoProducto.imagen = req.file.filename;
            let productoAnterior = await Productos.findById(req.params.idProducto);


            fs.unlink(__dirname+`../../uploads/${productoAnterior.imagen}`, function (err) {
                if (err)  throw err;
                console.log('Archivo eliminado');
            });
        } else {
            let productoAnterior = await Productos.findById(req.params.idProducto);
            nuevoProducto.imagen = productoAnterior.imagen;
        }

        let producto = await Productos.findOneAndUpdate({_id: req.params.idProducto },
            nuevoProducto, {
                new: true
            }
        )

        res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Eliminar producto
exports.eliminarProducto = async (req, res, next) => {
    const { idProducto } = req.params;
    if (idProducto.length <= 23 ) {
        res.json({ mensaje: "Este producto no existe"});
        return next();
    }
    try {
     
        // buscar la ruta de la imagen
        const producto = await Productos.findById({_id: idProducto});

        // si existe la imagen la eliminamos
        if (producto.imagen) {
            fs.unlink(__dirname+`../../uploads/${producto.imagen}`, function (err) {
                if (err)  throw err;
                console.log('Archivo eliminado');
            });
        }

        await Productos.findByIdAndDelete({_id: req.params.idProducto});
        res.json({mensaje: "El producto se ha eliminado"});
    } catch (error) {
        console.log(error);
        next();
    }
}