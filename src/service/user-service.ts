import { v7 as uuid, v4 as token } from "uuid";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  toUserResponse,
  UserLoginRequest,
  UserUpdateRequest,
  type CreateUserRequest,
  type UserResponse,
} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import { Bcrypt } from "../lib/bcrypt";
import { User } from "@prisma/client";

export class UserService {
  static async register(request: CreateUserRequest): Promise<UserResponse> {
    const registerRequest = Validation.validate(UserValidation.REGISTER, request);

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
  static async login(request: UserLoginRequest): Promise<UserResponse> {
    const loginRequest = Validation.validate(UserValidation.LOGIN, request);
    let user = await prismaClient.user.findUnique({
      where: { username: loginRequest.username },
    });

    if (!user) {
      throw new ResponseError(401, "Username or Password is wrong");
    }
    const isPasswordValid = await Bcrypt.compare(loginRequest.password, user.password);

    if (!isPasswordValid) {
      throw new ResponseError(401, "Username or Password is wrong");
    }

    user = await prismaClient.user.update({
      where: { username: loginRequest.username },
      data: {
        token: token(),
      },
    });
    const response = toUserResponse(user);
    response.token = user.token!;
    return response;
  }
  static async get(user: User): Promise<UserResponse> {
    return toUserResponse(user);
  }
  static async update(user: User, request: UserUpdateRequest): Promise<UserResponse> {
    const updateRequest = Validation.validate(UserValidation.UPDATE, request);
    if (updateRequest.name) {
      user.name = updateRequest.name;
    }
    if (updateRequest.password) {
      user.password = await Bcrypt.hash(updateRequest.password);
    }
    const result = await prismaClient.user.update({
      where: { username: user.username },
      data: user,
    });
    return toUserResponse(result);
  }
  static async logout(user: User): Promise<UserResponse> {
    const result = await prismaClient.user.update({
      where: { username: user.username },
      data: { token: null },
    });
    return toUserResponse(result);
  }
}
