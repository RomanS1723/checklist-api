import { Injectable, OnModuleInit } from '@nestjs/common';
import { User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { UserAdd, UserChange, Roles } from 'src/dto/user';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(private readonly databaseService: DatabaseService) {}

  async onModuleInit() {
    await this.ensureAdminExists();
  }

  async findByLogin(login: string): Promise<User> {
    return await this.databaseService.user.findFirst({ where: { login } });
  }

  async findById(id: number): Promise<User> {
    return await this.databaseService.user.findFirst({ where: { id } });
  }

  async add(user: UserAdd): Promise<void> {
    await this.databaseService.user.create({ data: user });
  }

  async update(id: number, user: UserChange): Promise<void> {
    await this.databaseService.user.update({ where: { id }, data: user });
  }

  async deleteByLogin(login: string): Promise<void> {
    await this.databaseService.user.delete({ where: { login } });
  }

  async deleteById(id: number): Promise<void> {
    await this.databaseService.user.delete({ where: { id } });
  }

  private async ensureAdminExists() {
    const adminLogin = process.env.ADMIN_LOGIN || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin';
    const admin = await this.findByLogin(adminLogin);
    if (!admin) {
      await this.add({
        login: adminLogin,
        password: adminPassword,
        role: Roles.ADMIN,
      });
    }
  }
}
