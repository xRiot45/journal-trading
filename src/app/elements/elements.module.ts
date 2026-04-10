import { Module } from '@nestjs/common';
import { ElementsService } from './elements.service';
import { ElementsController } from './elements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElementEntity } from './entities/element.entity';
import { StrategiesModule } from '../strategies/strategies.module';
import { StrategyEntity } from '../strategies/entities/strategy.entity';
import { LoggerService } from 'src/core/logger/logger.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([ElementEntity, StrategyEntity]), StrategiesModule],
    controllers: [ElementsController],
    providers: [ElementsService, LoggerService, JwtService],
    exports: [ElementsService],
})
export class ElementsModule {}
