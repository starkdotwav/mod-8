# Proyecto Módulo 8 — Node & Express Web App

API RESTful para gestión de usuarios y productos, con PostgreSQL, Sequelize, JWT y subida de archivos.

## Requisitos

- Node.js 18 o superior.
- PostgreSQL instalado y ejecutándose.
- Git y npm.

## Instalación

```bash
git clone https://github.com/starkdotwav/mod-8.git
cd mod-8
npm install
```

Crea el archivo local de variables de entorno:

```bash
cp .env.example .env
```

En Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

No subas `.env` a GitHub. Este archivo contiene datos privados y está excluido mediante `.gitignore`.

## Base de datos

Crea una base de datos PostgreSQL:

```sql
CREATE DATABASE mod8_db;
```

Luego edita `.env`:

```env
PORT=3000
DATABASE_URL=postgres://postgres:TU_CLAVE@localhost:5432/mod8_db
JWT_SECRET=una_clave_segura_para_desarrollo
JWT_EXPIRES_IN=1h
MAX_FILE_SIZE=5242880
```

Ajusta el usuario, contraseña, host y puerto según tu instalación.

## Ejecución

Modo desarrollo:

```bash
npm run dev
```

Modo producción:

```bash
npm start
```

La aplicación estará disponible en `http://localhost:3000`.

## Comprobación de estado

Abre en el navegador o prueba con curl:

```text
http://localhost:3000/health
```

```bash
curl http://localhost:3000/health
```

Respuesta esperada:

```json
{
  "status": "success",
  "message": "API funcionando",
  "data": {
    "uptime": 10.123
  }
}
```

Si la ruta no responde, verifica que `npm run dev` esté activo y que PostgreSQL esté funcionando.

## Endpoints

| Método | Ruta | Descripción | Seguridad |
|---|---|---|---|
| GET | `/health` | Estado de la API | Pública |
| POST | `/api/auth/register` | Registrar usuario | Pública |
| POST | `/api/auth/login` | Obtener token JWT | Pública |
| GET | `/api/products` | Listar productos | Pública |
| GET | `/api/products/:id` | Obtener producto | Pública |
| POST | `/api/products` | Crear producto | JWT |
| PUT | `/api/products/:id` | Actualizar producto | JWT |
| DELETE | `/api/products/:id` | Eliminar producto | JWT |
| POST | `/api/upload` | Subir imagen | JWT |

## Autenticación

Registra un usuario:

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Marcel",
  "email": "marcel@example.com",
  "password": "Password123!"
}
```

Inicia sesión:

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "marcel@example.com",
  "password": "Password123!"
}
```

Usa el token recibido en las rutas privadas:

```http
Authorization: Bearer TU_TOKEN_JWT
```

## Subida de archivos

Usa `multipart/form-data` en `POST /api/upload`, con un campo llamado `file`. Se aceptan imágenes JPG, JPEG, PNG, GIF y WEBP de hasta 5 MB.

## Pruebas de entrega

En Postman realiza capturas de:

1. `GET /health`.
2. Registro exitoso.
3. Login exitoso y token JWT.
4. Ruta privada sin token, con error `401`.
5. Creación de producto con token.
6. Actualización y eliminación de producto.
7. Subida de imagen.
8. Error por archivo inválido o demasiado grande.

## Arquitectura

```text
src/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── services/
├── app.js
└── server.js
uploads/
logs/
```

Las rutas reciben solicitudes, los controladores coordinan la respuesta, los servicios concentran la lógica y los modelos gestionan la persistencia.

## Seguridad

- Contraseñas protegidas con bcrypt.
- Tokens JWT con expiración.
- Rutas de escritura protegidas.
- Validación de archivos por tipo y tamaño.
- Variables privadas fuera del repositorio.
- Manejo centralizado de errores.
