module.exports = (sequelize, dataTypes) => {
    let alias = "talles_producto";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement:true,
        },
        productoId: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        talleId: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        tableName: "talles_producto",
        timestamps: false
    };
    const talles_productos = sequelize.define(alias,cols,config);
    return talles_productos;
}