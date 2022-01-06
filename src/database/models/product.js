module.exports = (sequelize, DataTypes) => {
    let alias = "Producto";

    let cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        precio: {
            type: DataTypes.FLOAT.UNSIGNED,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        marca: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        descuento: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        idCategoria: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        idGeneros: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        tableName: "productos",
        timestamps: true,
    };
    const Product = sequelize.define(alias, cols, config);

    /* Relaciones de Producto: 
        1) Categoria
        2) Genero
        3) Colores
        4) Talle
        5) Carrito
    */

    Product.associate = models => {
        Product.belongsTo(models.Categoria, {
            as: "Categoria",
            foreignKey: "idCategoria"
        })

        Product.belongsTo(models.Genero, {
            as: "Genero",
            foreignKey: "idGeneros"
        })

        Product.belongsToMany(models.Color, {
            as: "Colores",
            through: "colores_producto",
            foreignKey: "productoId",
            otherKey: "colorId",
            timestamps: false
        })

        Product.belongsToMany(models.Talle, {
            as: "Talles",
            through: "talles_producto",
            foreignKey: "productoId",
            otherKey: "talleId",
            timestamps: false
        })

        Product.belongsToMany(models.Usuario, {
            as: "carrito",
            through: "Carrito",
            foreignKey: "id_producto",
            otherKey:"id_usuario",
            timestamps: false
        })
    }

    return Product;
}