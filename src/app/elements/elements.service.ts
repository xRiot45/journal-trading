import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ElementEntity } from './entities/element.entity';
import { StrategyEntity } from '../strategies/entities/strategy.entity';
import { Repository, DataSource } from 'typeorm';
import { StrategiesService } from '../strategies/strategies.service';
import { LoggerService } from 'src/core/logger/logger.service';
import { UpsertElementDto } from './dto/req/create-element.dto';
import { ElementResponseDto } from './dto/res/element-response.dto';
import { CanvasHistoryEntity, HistoryActionType } from '../strategies/entities/canvas-history.entity';
import { plainToInstance } from 'class-transformer';
import { mapToDto } from 'src/shared/utils/transformer.util';

@Injectable()
export class ElementsService {
    constructor(
        @InjectRepository(ElementEntity)
        private readonly elementRepository: Repository<ElementEntity>,
        @InjectRepository(StrategyEntity)
        private readonly strategyRepository: Repository<StrategyEntity>,
        @InjectRepository(CanvasHistoryEntity)
        private readonly historyRepository: Repository<CanvasHistoryEntity>,
        private readonly strategiesService: StrategiesService,
        private readonly dataSource: DataSource,
        private readonly logger: LoggerService,
    ) {}

    async getAllElementsByStrategyID(strategyId: string): Promise<ElementResponseDto[]> {
        const elements = await this.elementRepository.find({
            where: { strategyId },
            order: { zIndex: 'ASC', createdAt: 'ASC' },
        });
        return elements.map(el => plainToInstance(ElementResponseDto, el, { excludeExtraneousValues: true }));
    }

    async upsertElement(dto: UpsertElementDto): Promise<ElementResponseDto> {
        const context = `${ElementsService.name}.upsertElement`;
        const { id, strategyId, parentElementId } = dto;

        if (!strategyId) {
            throw new BadRequestException('strategyId is required');
        }

        const strategy = await this.strategyRepository.findOne({
            where: { id: strategyId },
        });

        if (!strategy) {
            throw new NotFoundException(`Strategy with id ${strategyId} not found`);
        }

        if (parentElementId) {
            // Pastikan parent berada di dalam strategy yang sama
            const parent = await this.elementRepository.findOne({
                where: { id: parentElementId, strategyId },
            });

            if (!parent) {
                throw new BadRequestException(`Parent node ${parentElementId} not found`);
            }

            // Cegah element merujuk dirinya sendiri sebagai parent (circular reference)
            if (id && parentElementId === id) {
                throw new BadRequestException(`Element cannot be its own parent`);
            }
        }

        // ─── RESOLVE ELEMENT: Tentukan apakah operasi ini CREATE atau UPDATE ──────
        const isUpdate: boolean = !!id;
        let element: ElementEntity;

        if (isUpdate) {
            // UPDATE: Cari element existing, lalu merge dengan data dto terbaru
            const existing = await this.elementRepository.findOne({
                where: { id, strategyId },
            });

            if (!existing) {
                throw new NotFoundException(`Element with id ${id} not found in this strategy`);
            }

            element = this.elementRepository.merge(existing, dto);
        } else {
            // CREATE: Buat entity baru dengan nilai default dimensi jika tidak disertakan
            element = this.elementRepository.create({
                ...dto,
                x: dto.x ?? 0,
                y: dto.y ?? 0,
                width: dto.width ?? 160,
                height: dto.height ?? 60,
            });
        }

        const saved: ElementEntity = await this.elementRepository.save(element);
        const currentElements: ElementEntity[] = await this.elementRepository.find({
            where: { strategyId },
        });

        const lastHistory = await this.historyRepository.findOne({
            where: { strategyId },
            order: { stackIndex: 'DESC' },
        });

        const nextStackIndex: number = lastHistory ? lastHistory.stackIndex + 1 : 0;

        const actionType: HistoryActionType = isUpdate
            ? HistoryActionType.UPDATE_ELEMENT
            : HistoryActionType.CREATE_ELEMENT;

        await this.historyRepository.save({
            strategyId,
            actionType,
            label: `${isUpdate ? 'Update' : 'Create'} element: ${saved.identifier}`,
            snapshot: JSON.stringify(currentElements),
            stackIndex: nextStackIndex,
            createdAt: new Date(),
        });

        await this.strategyRepository.update(strategyId, {
            lastEditedAt: new Date(),
        });

        this.logger.log(`${isUpdate ? 'Updated' : 'Created'} element ${saved.id} and pushed snapshot`, context);
        return mapToDto(ElementResponseDto, saved);
    }
}
