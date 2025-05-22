import { SetMetadata } from '@nestjs/common';
import { Roles } from '../dto/user';

export const Role = (...roles: Roles[]) => SetMetadata('roles', roles);
