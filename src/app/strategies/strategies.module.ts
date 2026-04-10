import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from 'src/core/logger/logger.service';
import { StrategyEntity } from './entities/strategy.entity';
import { StrategiesController } from './strategies.controller';
import { StrategiesService } from './strategies.service';
import { ElementEntity } from '../elements/entities/element.entity';
import { CanvasHistoryEntity } from './entities/canvas-history.entity';

@Module({
    imports: [TypeOrmModule.forFeature([StrategyEntity, CanvasHistoryEntity, ElementEntity])],
    controllers: [StrategiesController],
    providers: [StrategiesService, JwtService, LoggerService],
    exports: [StrategiesService],
})
export class StrategiesModule {}
