import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
export class Bcrypt {
  static async hash(password: string): Promise<string> {
    const hashedPassword = bcrypt.hash(password, process.env.BCRYPT_SALT || 10);
    return hashedPassword;
  }
}
