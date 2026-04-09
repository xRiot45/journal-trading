import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PairsModule } from './pairs/pairs.module';
import { SessionsModule } from './sessions/sessions.module';
import { ElementsModule } from './elements/elements.module';
import { TradingPlansModule } from './trading-plans/trading-plans.module';
import { StrategiesModule } from './strategies/strategies.module';
import { JournalsModule } from './journals/journals.module';
import { CalendarModule } from './calendar/calendar.module';

@Module({
    imports: [
        UsersModule,
        AuthModule,
        PairsModule,
        SessionsModule,
        StrategiesModule,
        ElementsModule,
        TradingPlansModule,
        JournalsModule,
        CalendarModule,
    ],
    exports: [],
    controllers: [],
    providers: [],
})
export class AppModule {}
