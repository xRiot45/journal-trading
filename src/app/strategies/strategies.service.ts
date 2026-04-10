import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StrategyEntity } from './entities/strategy.entity';
import { Repository } from 'typeorm';
import { LoggerService } from 'src/core/logger/logger.service';
import { StrategiesRequestDto } from './dto/req/strategies-request.dto';
import { StrategiesResponseDto } from './dto/res/strategies-response.dto';
import { CanvasHistoryEntity, HistoryActionType } from './entities/canvas-history.entity';
import { ElementEntity } from '../elements/entities/element.entity';

const MAX_HISTORY_PER_STRATEGY = 50;

@Injectable()
export class StrategiesService {
    constructor(
        @InjectRepository(StrategyEntity)
        private readonly strategyRepository: Repository<StrategyEntity>,
        @InjectRepository(CanvasHistoryEntity)
        private readonly historyRepository: Repository<CanvasHistoryEntity>,
        @InjectRepository(ElementEntity)
        private readonly elementRepository: Repository<ElementEntity>,
        private readonly logger: LoggerService,
    ) {}

    // ---- DOCUMENT STRATEGIES CRUD ──────────────────────────────────────────────────────────

    async create(dto: StrategiesRequestDto): Promise<StrategiesResponseDto> {
        const context = `${StrategiesService.name}.create`;
        try {
            const strategy = this.strategyRepository.create({ title: dto.title, description: dto.description });
            const result = await this.strategyRepository.save(strategy);
            this.logger.log(`Strategy created: ${result.id}`, context);
            return this.toResponseDto(result);
        } catch (error) {
            this.logAndRethrow(error, context, 'Error creating strategy');
        }
    }

    async findAll(): Promise<StrategiesResponseDto[]> {
        const context = `${StrategiesService.name}.findAll`;
        try {
            const strategies = await this.strategyRepository.find();
            return strategies.map(s => this.toResponseDto(s));
        } catch (error) {
            this.logAndRethrow(error, context, 'Error fetching strategies');
        }
    }

    async findOne(strategyId: string): Promise<StrategiesResponseDto> {
        const context = `${StrategiesService.name}.findOne`;
        try {
            const strategy = await this.findStrategyOrFail(strategyId);
            return this.toResponseDto(strategy);
        } catch (error) {
            this.logAndRethrow(error, context, 'Error fetching strategy');
        }
    }

    // ── INTERNAL — SNAPSHOT ENGINE ─────────────────────────────────────────────

    async pushSnapshot(strategyId: string, actionType: HistoryActionType, label: string): Promise<CanvasHistoryEntity> {
        const elements = await this.elementRepository.find({ where: { strategyId: strategyId } });
        const nextIndex = await this.getNextStackIndex(strategyId);
        return this.pushSnapshotWithData(strategyId, actionType, label, elements, this.historyRepository, nextIndex);
    }

    private async pushSnapshotWithData(
        strategyId: string,
        actionType: HistoryActionType,
        label: string,
        elements: ElementEntity[],
        repo: Repository<CanvasHistoryEntity>,
        stackIndex: number,
    ): Promise<CanvasHistoryEntity> {
        const entry = repo.create({ strategyId, actionType, label, snapshot: JSON.stringify(elements), stackIndex });
        const saved = await repo.save(entry);

        const totalCount = await repo.count({ where: { strategyId } });
        if (totalCount > MAX_HISTORY_PER_STRATEGY) {
            const overflow = totalCount - MAX_HISTORY_PER_STRATEGY;
            const oldest = await repo.find({
                where: { strategyId },
                order: { stackIndex: 'ASC' },
                take: overflow,
                select: ['id'],
            });
            await repo.delete(oldest.map(e => e.id));
        }
        return saved;
    }

    private async getNextStackIndex(strategyId: string): Promise<number> {
        const latest = await this.historyRepository.findOne({
            where: { strategyId },
            order: { stackIndex: 'DESC' },
            select: ['stackIndex'],
        });
        return (latest?.stackIndex ?? -1) + 1;
    }

    // ---- HELPERS ────────────────────────────────────────────────────────────────

    private async findStrategyOrFail(strategyId: string): Promise<StrategyEntity> {
        const strategy = await this.strategyRepository.findOne({
            where: { id: strategyId },
        });

        if (!strategy) throw new NotFoundException(`Strategy with id ${strategyId} not found`);
        return strategy;
    }

    private logAndRethrow(error: unknown, context: string, msg: string): never {
        const message = error instanceof Error ? error.message : 'Unknown error';
        const stack = error instanceof Error ? error.stack : undefined;
        this.logger.error(`${msg}: ${message}`, context, stack);
        throw error;
    }

    private toResponseDto(s: StrategyEntity): StrategiesResponseDto {
        return {
            id: s.id,
            title: s.title,
            content: s.content ?? null,
            description: s.description ?? null,
            lastEditedAt: s.lastEditedAt,
            viewport: { viewportX: s.viewportX, viewportY: s.viewportY, zoom: s.zoom },
            canvasSettings: {
                background: s.background,
                backgroundColor: s.backgroundColor,
                snapToGrid: s.snapToGrid,
                gridSize: s.gridSize,
            },
            createdAt: s.createdAt,
            updatedAt: s.updatedAt,
        };
    }
}
