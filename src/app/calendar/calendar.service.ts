import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JournalEntity } from '../journals/entities/journal.entity';
import { Repository } from 'typeorm';
import { LoggerService } from 'src/core/logger/logger.service';
import { CalendarDayDto, CalendarDaySummaryDto, CalendarResponseDto } from './dto/res/calendar-response.dto';

@Injectable()
export class CalendarService {
    constructor(
        @InjectRepository(JournalEntity)
        private readonly journalRepository: Repository<JournalEntity>,
        private readonly logger: LoggerService,
    ) {}

    async getMonthlyPnLCalendar(month: number, year: number): Promise<CalendarResponseDto> {
        const context = `${CalendarService.name}.getMonthlyPnLCalendar`;
        this.logger.log(`Fetching calendar data for ${year}-${month}`, context);

        // 1. Build date range
        const paddedMonth = String(month).padStart(2, '0');
        const lastDay = new Date(year, month, 0).getDate();
        const startDate = `${year}-${paddedMonth}-01`;
        const endDate = `${year}-${paddedMonth}-${String(lastDay).padStart(2, '0')}`;

        // 2. Query aggregasi PnL per tanggal
        const rawData = await this.journalRepository
            .createQueryBuilder('journal')
            .select("DATE_FORMAT(journal.date, '%Y-%m-%d')", 'date')
            .addSelect('SUM(journal.profitAndLoss)', 'totalPnL')
            .addSelect('COUNT(journal.id)', 'tradeCount')
            .where('journal.date BETWEEN :startDate AND :endDate', { startDate, endDate })
            .groupBy('journal.date')
            .orderBy('journal.date', 'ASC')
            .getRawMany<{ date: string; totalPnL: number; tradeCount: number }>();

        // 3. Build lookup map
        const pnlMap = new Map(rawData.map(row => [row.date, row]));

        // 4. Generate semua hari dalam bulan & mapping ke DTO
        let totalProfit = 0;
        let totalLoss = 0;

        const days: CalendarDayDto[] = Array.from({ length: lastDay }, (_, i) => {
            const day = i + 1;
            const dateStr = `${year}-${paddedMonth}-${String(day).padStart(2, '0')}`;
            const row = pnlMap.get(dateStr);

            const rawPnL = row ? Number(row.totalPnL) : 0;
            const totalPnL = Math.round(rawPnL * 100) / 100;
            const tradeCount = row ? Number(row.tradeCount) : 0;
            const status = totalPnL > 0 ? 'profit' : totalPnL < 0 ? 'loss' : 'neutral';

            if (totalPnL > 0) totalProfit += totalPnL;
            else if (totalPnL < 0) totalLoss += totalPnL;

            return { date: dateStr, day, totalPnL, tradeCount, status } as CalendarDayDto;
        });

        // 5. Hitung summary
        const summary: CalendarDaySummaryDto = {
            totalProfit: Math.round(totalProfit * 100) / 100,
            totalLoss: Math.round(totalLoss * 100) / 100,
            netPnL: Math.round((totalProfit + totalLoss) * 100) / 100,
        };

        return { month, year, summary, days };
    }
}
