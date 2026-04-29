import dotenv from 'dotenv';
import path from 'path';

// Load .env
dotenv.config({ path: path.join(process.cwd(), '.env') });

export const config = {
  port: process.env.PORT || 3000,
  db_url: process.env.DB_URL,
  node_env : process.env.NODE_ENV,
  jwt_secret : process.env.JWT_SECRET,
  jwt_expires_in : process.env.JWT_EXPIRES_IN,
  super_admin_email : process.env.SUPER_ADMIN_EMAIL,
  super_admin_password : process.env.SUPER_ADMIN_PASSWORD
};
