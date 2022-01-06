module.exports = (sequelize, dataTypes) => {
    let alias = "Imagen";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement:true,
        },
        nombre: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        productoId: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        tableName: "imagenes",
        timestamps: false
    };

    /* Imagenes tiene una relacion con Productos */

    const Imagen = sequelize.define(alias,cols,config);
    Imagen.associate = models => {
        Imagen.belongsTo(models.Producto, {
            as: "Producto",
            foreignKey: "productoId"
        })
    }

    return Imagen;
}