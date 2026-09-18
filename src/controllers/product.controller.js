import * as service from '../services/product.service.js';
export async function list(req, res, next) { try { res.json({ status: 'success', message: 'Productos obtenidos', data: await service.listProducts(req.query) }); } catch (e) { next(e); } }
export async function getOne(req, res, next) { try { res.json({ status: 'success', message: 'Producto obtenido', data: await service.getProduct(req.params.id) }); } catch (e) { next(e); } }
export async function create(req, res, next) { try { res.status(201).json({ status: 'success', message: 'Producto creado', data: await service.createProduct(req.body, req.user.id) }); } catch (e) { next(e); } }
export async function update(req, res, next) { try { res.json({ status: 'success', message: 'Producto actualizado', data: await service.updateProduct(req.params.id, req.body) }); } catch (e) { next(e); } }
export async function remove(req, res, next) { try { await service.deleteProduct(req.params.id); res.json({ status: 'success', message: 'Producto eliminado', data: null }); } catch (e) { next(e); } }
