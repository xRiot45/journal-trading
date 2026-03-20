import { Module } from '@nestjs/common';
import { PairsService } from './pairs.service';
import { PairController } from './pairs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PairEntity } from './entities/pair.entity';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from 'src/core/logger/logger.service';

@Module({
    imports: [TypeOrmModule.forFeature([PairEntity])],
    controllers: [PairController],
    providers: [PairsService, JwtService, LoggerService],
})
export class PairsModule {}
