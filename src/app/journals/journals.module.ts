import { Module } from '@nestjs/common';
import { JournalsService } from './journals.service';
import { JournalsController } from './journals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JournalEntity } from './entities/journal.entity';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from 'src/core/logger/logger.service';
import { PairEntity } from '../pairs/entities/pair.entity';
import { StrategyEntity } from '../strategies/entities/strategy.entity';

@Module({
    imports: [TypeOrmModule.forFeature([JournalEntity, PairEntity, StrategyEntity])],
    controllers: [JournalsController],
    providers: [JournalsService, JwtService, LoggerService],
})
export class JournalsModule {}
