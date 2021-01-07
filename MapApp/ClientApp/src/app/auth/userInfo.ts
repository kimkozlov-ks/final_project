import {PermissionType} from './permissionType';
import {isWhiteSpace} from "tslint";

export default class UserInfo {
  username: string;
  role: string;
  issuedAt: number;
  expires: number;
  permissions: PermissionType[];

  constructor(decoded: any) {
    if(decoded.Permission)
      this.permissions = decoded.Permission.map(n => PermissionType[parseInt(n, 0)]);

    this.username = decoded.unique_name;
    this.role = decoded.role;
    this.issuedAt = decoded.iat;
    this.expires = decoded.exp;
  }
}
