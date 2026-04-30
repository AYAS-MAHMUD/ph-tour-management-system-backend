import dotenv from 'dotenv';
import path from 'path';

// Load .env
dotenv.config({ path: path.join(process.cwd(), '.env') });

export const config = {
  port: process.env.PORT || 3000,
  db_url: process.env.DB_URL,
  node_env : process.env.NODE_ENV,
  jwt_access_secret : process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in : process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_secret : process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expires_in : process.env.JWT_REFRESH_EXPIRES_IN,
  super_admin_email : process.env.SUPER_ADMIN_EMAIL,
  super_admin_password : process.env.SUPER_ADMIN_PASSWORD,
  google_client_id : process.env.GOOGLE_CLIENT_ID as string,
  google_client_secret : process.env.GOOGLE_CLIENT_SECRET as string ,
  google_callback_url : process.env.GOOGLE_CALLBACK_URL as string,
  frontend_url : process.env.FRONTEND_URL,
  express_session_secret : process.env.EXPRESS_SESSION_SECRET as string
};
