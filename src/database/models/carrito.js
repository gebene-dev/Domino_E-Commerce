
module.exports = (sequelize, dataTypes) => {
    let alias = "Carrito";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement:true,
        },
        orderId: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        usuarioId: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        productoId: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        quantity: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        createdAt: {
            type: dataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: dataTypes.DATE,
            allowNull: false
        }
    };
    let config = {
        tableName: "carritos",
        timestamps: true
    };
    const Carrito = sequelize.define(alias,cols,config);

    /* Relaciones */

    Carrito.associate = models => {
        Carrito.belongsTo(models.Orden, {
            as : 'orden',
            foreignKey : 'orderId',
            onDelete : 'cascade'
        })
        Carrito.belongsTo(models.Producto,{
            as: 'product',
            foreignKey : 'productoId'
          })
    }
    return Carrito;
}