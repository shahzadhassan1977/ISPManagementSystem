
//src/auth/jwt.payload.ts
export interface JwtPayload {
  sub: number;          // user id
  email: string;
  // RBAC
  roles: string[];      // ['Admin', 'Sales']
  permissions?: string[]; // optional (for advanced)
}