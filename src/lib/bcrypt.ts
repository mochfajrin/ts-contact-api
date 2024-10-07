import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
export class Bcrypt {
  static async hash(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT || 10));
    return hashedPassword;
  }
  static async compare(password: string, hashedPassword: string): Promise<boolean> {
    const isValid = await bcrypt.compare(password, hashedPassword);
    return isValid;
  }
}
