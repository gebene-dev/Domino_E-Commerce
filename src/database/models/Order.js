module.exports = (sequelize, dataTypes) => {
    let alias = "Orden";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement:true,
        },
        status: {
            type: dataTypes.STRING(45)
        },
        userId: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        total: {
            type: dataTypes.DECIMAL(10,0),
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
        tableName: "orders",
        timestamps: true
    };
    const Orden = sequelize.define(alias,cols,config);
    
    Orden.associate = models => {
        Orden.hasMany(models.Carrito, {
            as: "carts",
            foreignKey: "orderId",
            onDelete : 'cascade'
        })
        Orden.belongsTo(models.Usuario,{
            as : 'user',
            foreignKey : 'userId',
          })
    }
    return Orden;
} 