import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Role } from 'src/role/role.decorator';
import { Roles, UserChange } from 'src/dto/user';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/role/role.guard';

@Controller('admin')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  @UseGuards(AuthGuard, RoleGuard)
  @Role(Roles.ADMIN)
  async getAll() {
    return await this.userService.getAll();
  }

  @Put('user/:id')
  @UseGuards(AuthGuard, RoleGuard)
  @Role(Roles.ADMIN)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UserChange,
  ) {
    return await this.userService.update(id, user);
  }

  @Delete('user/:id')
  @UseGuards(AuthGuard, RoleGuard)
  @Role(Roles.ADMIN)
  async del(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteById(id);
  }
}
