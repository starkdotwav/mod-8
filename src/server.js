import dotenv from 'dotenv';
import app from './app.js';
import sequelize from './config/database.js';
import './models/User.js';
import './models/Product.js';
dotenv.config();
const PORT = process.env.PORT || 3000;
try { await sequelize.authenticate(); await sequelize.sync(); app.listen(PORT, () => console.log(`Servidor ejecutándose en http://localhost:${PORT}`)); } catch (error) { console.error('No fue posible iniciar la aplicación:', error.message); process.exit(1); }
