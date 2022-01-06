module.exports = (sequelize, dataTypes) => {
    let alias = "Usuario";
    
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
        },
        apellido: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        email: {
            type: dataTypes.STRING(200),
            allowNull: false,
        },
        password: {
            type: dataTypes.STRING(200),
            allowNull: false,
        },
        birthday: {
            type: dataTypes.DATE,
            allowNull: false
        },
        avatar: {
            type: dataTypes.STRING(200),
            allowNull: false,
        },
        rol: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        createdAt: {
            type: dataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: dataTypes.DATE,
            allowNull: false
        },
    };
    let config = {
        tableName: "usuarios",
        timestamps: true
    };

    /* Usuarios tiene relacion con Carrito */

    const User = sequelize.define(alias,cols,config);
    User.associate = models => {
        User.belongsToMany(models.Carrito, {
            as: "carrito",
            through: "Carrito",
            foreignKey: "id_usuario",
            otherKey:"id_producto",
            timestamps: false
        })
    }
    return User;

}