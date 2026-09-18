import { registerUser, loginUser } from '../services/auth.service.js';
export async function register(req, res, next) { try { res.status(201).json({ status: 'success', message: 'Usuario registrado', data: await registerUser(req.body) }); } catch (err) { next(err); } }
export async function login(req, res, next) { try { res.json({ status: 'success', message: 'Login exitoso', data: await loginUser(req.body) }); } catch (err) { next(err); } }
