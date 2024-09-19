import dotenv from "dotenv";
import { JwtPayload, sign, verify } from "jsonwebtoken";

dotenv.config();

export class Jwt {
  static async sign(payload: {
    username: string;
    name: string;
  }): Promise<string> {
    return new Promise((resolve, reject) => {
      sign(payload, process.env.JWT_SECRET || "secret", (err, token) => {
        if (err) reject(err);
        resolve(token!);
      });
    });
  }
  static async verify(token: string): Promise<string | JwtPayload> {
    return new Promise((resolve, reject) => {
      verify(token, process.env.JWT_SECRET || "secret", (err, payload) => {
        if (err) reject(err);
        resolve(payload!);
      });
    });
  }
}
