import { Repository, FindOptionsWhere, FindOptionsOrder, ObjectLiteral } from 'typeorm';
import { PaginationQueryDto } from '../dto/pagination.dto';
import { PaginationResponse } from '../interfaces/pagination.interface';

export async function paginate<T extends ObjectLiteral>(
    repository: Repository<T>,
    query: PaginationQueryDto,
    options: {
        where?: FindOptionsWhere<T> | FindOptionsWhere<T>[];
        order?: FindOptionsOrder<T>;
        relations?: string[];
        select?: (keyof T)[];
    } = {},
): Promise<PaginationResponse<T>> {
    const page = query?.page ?? 1;
    const limit = query?.limit ?? 10;
    const skip = (page - 1) * limit;

    const [data, totalItems] = await repository.findAndCount({
        where: options.where,
        order: options.order,
        relations: options.relations,
        select: options.select,
        skip,
        take: limit,
    });

    return {
        data,
        meta: {
            page,
            limit,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            hasNextPage: page < Math.ceil(totalItems / limit),
            hasPreviousPage: page > 1,
        },
    };
}
