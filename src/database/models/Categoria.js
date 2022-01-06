module.exports = (sequelize, dataTypes) => {
    let alias = "Categoria";
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
        tableName: "categorias",
        timestamps: false
    };
    const Categoria = sequelize.define(alias,cols,config);
    return Categoria;
}