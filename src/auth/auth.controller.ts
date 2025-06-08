import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Roles } from 'src/dto/user';
import { Role } from 'src/role/role.decorator';
import { RoleGuard } from 'src/role/role.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() signInDto: Record<string, string>,
  ): Promise<{ accessToken: string; role: Roles }> {
    return await this.authService.signIn(signInDto.login, signInDto.password);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Role(Roles.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Post('admin/register')
  async register(
    @Body() registerDto: { login: string; password: string; role: Roles },
  ): Promise<void> {
    await this.authService.register(
      registerDto.login,
      registerDto.password,
      registerDto.role,
    );
  }
}
