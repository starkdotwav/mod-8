import multer from 'multer';
import path from 'path';
import fs from 'fs';
const uploadDir = path.resolve('uploads');
fs.mkdirSync(uploadDir, { recursive: true });
const storage = multer.diskStorage({ destination: uploadDir, filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_')}`) });
const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
export const upload = multer({ storage, limits: { fileSize: Number(process.env.MAX_FILE_SIZE || 5242880) }, fileFilter: (req, file, cb) => cb(null, allowed.includes(file.mimetype)) });
