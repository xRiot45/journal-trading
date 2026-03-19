import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PairModule } from './pair/pair.module';
@Module({
    imports: [UsersModule, AuthModule, PairModule],
    exports: [],
    controllers: [],
    providers: [],
})
export class AppModule {}
