import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'generated/prisma';
import { Roles } from 'src/dto/user';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    login: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user: User = await this.userService.findByLogin(login);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const playload = { sub: user.id, username: user.login };
    return {
      accessToken: await this.jwtService.signAsync(playload),
    };
  }

  async register(login: string, password: string, role: Roles): Promise<void> {
    await this.userService.add({
      login,
      password,
      role,
    });
  }
}
