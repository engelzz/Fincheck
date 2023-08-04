import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
