# Proyecto Módulo 8 — Node & Express Web App

API RESTful para gestión de usuarios y productos, con autenticación JWT, Sequelize/PostgreSQL y subida de archivos.

## 1. Requisitos

- Node.js 18 o superior.
- PostgreSQL 14 o superior.
- npm.

## 2. Instalación

```bash
npm install
cp .env.example .env
npm run dev
```

La API quedará disponible en `http://localhost:3000`.

## 3. Variables de entorno

```env
PORT=3000
DATABASE_URL=postgres://postgres:postgres@localhost:5432/mod8_db
JWT_SECRET=cambia_esta_clave_por_una_segura
JWT_EXPIRES_IN=1h
MAX_FILE_SIZE=5242880
```

## 4. Endpoints

| Método | Ruta | Descripción | Seguridad |
|---|---|---|---|
| POST | `/api/auth/register` | Registrar usuario | Pública |
| POST | `/api/auth/login` | Obtener token JWT | Pública |
| GET | `/api/products` | Listar y filtrar productos | Pública |
| GET | `/api/products/:id` | Obtener producto | Pública |
| POST | `/api/products` | Crear producto | JWT |
| PUT | `/api/products/:id` | Actualizar producto | JWT |
| DELETE | `/api/products/:id` | Eliminar producto | JWT |
| POST | `/api/upload` | Subir imagen | JWT |
| GET | `/health` | Verificar estado del servidor | Pública |

## 5. Autenticación

Primero registra un usuario:

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Marcel",
  "email": "marcel@example.com",
  "password": "Password123!"
}
```

Después inicia sesión:

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "marcel@example.com",
  "password": "Password123!"
}
```

Envía el token recibido en las rutas privadas:

```http
Authorization: Bearer TU_TOKEN_JWT
```

## 6. Subida de archivos

Utiliza `multipart/form-data` en:

```http
POST /api/upload
```

El nombre del campo debe ser `file`. Se aceptan imágenes JPG, JPEG, PNG, GIF y WEBP, con un tamaño máximo de 5 MB.

## 7. Respuesta estándar

```json
{
  "status": "success",
  "message": "Operación realizada correctamente",
  "data": {}
}
```

Los errores utilizan el mismo formato:

```json
{
  "status": "error",
  "message": "Token no proporcionado",
  "data": null
}
```

## 8. Arquitectura

```text
src/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── services/
├── utils/
├── app.js
└── server.js
uploads/
logs/
.env.example
package.json
```

Las rutas reciben las solicitudes, los controladores coordinan la operación, los servicios concentran la lógica de negocio y los modelos gestionan la persistencia mediante Sequelize. Esta separación mejora el mantenimiento y permite escalar la aplicación.

## 9. Validaciones y seguridad

- Contraseñas almacenadas con `bcrypt`.
- Tokens firmados y con expiración mediante JWT.
- Rutas de escritura protegidas.
- Validación de correo, contraseña y campos obligatorios.
- Validación de existencia de productos.
- Validación de extensión, MIME y tamaño de archivos.
- Variables sensibles almacenadas en `.env`.
- `.env` excluido mediante `.gitignore`.
- Middleware centralizado para errores.
- Registro de eventos en `logs/app.log`.

## 10. Pruebas sugeridas en Postman

1. `GET /health`.
2. `POST /api/auth/register`.
3. `POST /api/auth/login`.
4. `GET /api/products`.
5. `POST /api/products` sin token: debe devolver `401`.
6. `POST /api/products` con token: debe devolver `201`.
7. `PUT /api/products/:id` con token.
8. `DELETE /api/products/:id` con token.
9. `POST /api/upload` con una imagen válida.
10. Repetir una ruta privada con token vencido o inválido.

## 11. Reflexión

El módulo 6 permitió construir el servidor, organizar rutas y servir contenido. El módulo 7 incorporó la base de datos, los modelos, las relaciones y las operaciones CRUD. Finalmente, el módulo 8 transformó la aplicación en una API RESTful consumible por clientes externos, incorporando autenticación JWT, middleware de seguridad, validaciones y subida de archivos.

La separación entre rutas, controladores, servicios y middlewares evita concentrar toda la lógica en un único archivo. Se protegieron las operaciones de creación, modificación, eliminación y carga de archivos porque pueden alterar información persistida o consumir recursos del servidor.

## 12. Licencia

Proyecto académico desarrollado para la evaluación de los módulos 6, 7 y 8.
