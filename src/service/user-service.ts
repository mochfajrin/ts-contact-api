import { v7 as uuid } from "uuid";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  toUserResponse,
  type CreateUserRequest,
  type UserResponse,
} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import { Bcrypt } from "../utils/bcrypt";

export class UserService {
  static async register(request: CreateUserRequest): Promise<UserResponse> {
    const registerRequest = Validation.validate(
      UserValidation.REGISTER,
      request
    );

    const isUsernameExist = await prismaClient.user.count({
      where: { username: registerRequest.username },
    });

    if (isUsernameExist) {
      throw new ResponseError(400, "Username already exist");
    }

    registerRequest.password = await Bcrypt.hash(registerRequest.password);

    const user = await prismaClient.user.create({
      data: { id: uuid(), ...registerRequest },
    });

    return toUserResponse(user);
  }
}
