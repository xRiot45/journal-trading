import { Module } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CalendarController } from './calendar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JournalEntity } from '../journals/entities/journal.entity';
import { LoggerService } from 'src/core/logger/logger.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([JournalEntity])],
    controllers: [CalendarController],
    providers: [CalendarService, LoggerService, JwtService],
})
export class CalendarModule {}
