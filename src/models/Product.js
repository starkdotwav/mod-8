import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
const Product = sequelize.define('Product', { id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true }, name: { type: DataTypes.STRING(120), allowNull: false }, description: { type: DataTypes.TEXT }, price: { type: DataTypes.DECIMAL(12, 2), allowNull: false, validate: { min: 0 } }, stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, validate: { min: 0 } }, imageUrl: { type: DataTypes.STRING } }, { tableName: 'products', timestamps: true });
User.hasMany(Product, { foreignKey: 'userId', onDelete: 'CASCADE' });
Product.belongsTo(User, { foreignKey: 'userId' });
export default Product;
