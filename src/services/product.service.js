import { Op } from 'sequelize';
import Product from '../models/Product.js';
export async function listProducts({ search, minPrice, maxPrice }) { const where = {}; if (search) where.name = { [Op.iLike]: `%${search}%` }; if (minPrice || maxPrice) where.price = { ...(minPrice && { [Op.gte]: minPrice }), ...(maxPrice && { [Op.lte]: maxPrice }) }; return Product.findAll({ where, order: [['createdAt', 'DESC']] }); }
export async function getProduct(id) { const product = await Product.findByPk(id); if (!product) throw Object.assign(new Error('Producto no encontrado'), { status: 404 }); return product; }
export async function createProduct(data, userId) { return Product.create({ ...data, userId }); }
export async function updateProduct(id, data) { const product = await getProduct(id); await product.update(data); return product; }
export async function deleteProduct(id) { const product = await getProduct(id); await product.destroy(); }
