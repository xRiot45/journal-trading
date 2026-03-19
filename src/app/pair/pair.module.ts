import { Module } from '@nestjs/common';
import { PairService } from './pair.service';
import { PairController } from './pair.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PairEntity } from './entities/pair.entity';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from 'src/core/logger/logger.service';

@Module({
    imports: [TypeOrmModule.forFeature([PairEntity])],
    controllers: [PairController],
    providers: [PairService, JwtService, LoggerService],
})
export class PairModule {}
