import { Request } from "express";
import User from "../database/models/User";
import Keystore from "../database/models/keystore";

// declare interface PublicRequest extends Request {
//   apiKey: string;
// }

declare interface RoleRequest extends Request{
  currentRoleCode: string;
}

declare interface ProtectedRequest extends RoleRequest {
  user: User;
  accessToken: string;
  keystore: Keystore;
}

declare interface Tokens {
  accessToken: string;
  refreshToken: string;
}
