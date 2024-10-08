import { SetMetadata } from '@nestjs/common';
import { Role } from '../user/interface/role';

// import { Reflector } from '@nestjs/core';
// import { Role } from '../user/interface/role';

export const ROLE_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLE_KEY, roles);

// export const Roles = Reflector.createDecorator<Role[]>();
