import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PairsModule } from './pairs/pairs.module';

@Module({
    imports: [UsersModule, AuthModule, PairsModule],
    exports: [],
    controllers: [],
    providers: [],
})
export class AppModule {}
