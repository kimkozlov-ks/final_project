import {PermissionType} from './PermissionType';

export default class UserInfo {
    id: string;
    username: string;
    role: string;
    issuedAt: number;
    expires: number;
    permissions: PermissionType[];

    constructor(decoded: any) {
        this.permissions = [];
            
        if(decoded && decoded.Permission)
            this.permissions = decoded.Permission.map((n: string) => PermissionType[parseInt(n, 0)]);

        this.id = decoded ? decoded.nameid : ''
        this.username = decoded ? decoded.unique_name : '';
        this.role = decoded ? decoded.role : '';
        this.issuedAt = decoded ? decoded.iat : 0;
        this.expires = decoded ? decoded.exp : 0;
    }
}