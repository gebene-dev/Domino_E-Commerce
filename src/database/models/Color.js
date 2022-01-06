module.exports = (sequelize, dataTypes) => {
    let alias = "Color";

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement:true,
        },
        nombre: {
            type: dataTypes.STRING(45),
            allowNull: false,
        }
    };
    let config = {
        tableName: "colores",
        timestamps: false
    };
    const Color = sequelize.define(alias,cols,config);

    /* Colores tiene una asociación a la tabla pivot: colores_producto  */

   Color.associate = models => {

        Color.belongsToMany(models.Producto, {
            as: "producto",
            through: "colores_producto",
            foreignKey: "colorId",
            otherKey: "productoId",
            timestamps: false
        })
    }

    return Color;
}