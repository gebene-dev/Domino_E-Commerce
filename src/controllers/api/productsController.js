const db = require('../../database/models')
const getURL = req => `${req.protocol}://${req.get('host')}${req.originalUrl}`;
const getURLBase = req => `${req.protocol}://${req.get('host')}`;
const {Op} = require('sequelize')

const throwError = (res,error) => {
    return res.status(error.status || 500).json({
        status : error.status || 500,
        message : error.message 
    })
}

module.exports = {
    list : async (req,res) => {
        let offset = +req.query.limit * (+req.query.current - 1)
        try {
            const total = await db.Producto.findAll()

            const products = await db.Imagen.findAll(
                {
                    limit : +req.query.limit || 10,
                    offset : offset || 0,
                    include: {association: "Producto"},
                    attributes: ['productoId', 'nombre'],
                    group: ['productoId'                ]
                }
            )




           /*  .then(productos => {
                db.Imagen.findAll({
                    include: {association: "Producto"},
                    attributes: ['productoId', 'nombre'],
                    group: ['productoId']    
                })
                    .then(imagenes => {
                        return res.render('products', {
                            productos,
                            imagenes
                    })
            })
            
        }) */

            let response = {
                status : 200,
                meta : {
                    total : total.length,
                    url : getURL(req)
                },
                data : products
            }
            return res.status(200).json(response)
        } catch (error) {
           throwError(res,error)
        }
    },
    
 
}

