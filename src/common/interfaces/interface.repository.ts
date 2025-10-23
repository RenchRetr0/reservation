import { BaseApiResponse } from '@common/dto/base-api-response.dto';
import { convertObjectToHash } from '@common/utils/convert-object-to-hash.util';
import { FindOptionsOrder, ObjectLiteral, Repository } from 'typeorm';
import { BaseMapper } from './base-mapper';
import { PaginatedResponse } from '@common/dto';

export abstract class IRepository<E extends ObjectLiteral, M> {
    protected repository: Repository<E>;
    protected mapper: BaseMapper<E, M>;

    protected constructor(repository: Repository<E>, mapper: BaseMapper<E, M>) {
        this.repository = repository;
        this.mapper = mapper;
    }

    findById?(id: number): Promise<M | null>;
    update?(item: M): Promise<M | void>;
    delete?(id: number): Promise<BaseApiResponse | void>;

    public async findAll(): Promise<Array<M>> {
        const entities = await this.repository.find({
            order: { id: 'DESC' } as unknown as FindOptionsOrder<E>,
        });
        return this.mapper.toDomainList(entities);
    }

    public async findAllWithPagination(
        limit: number,
        offset: number
    ): Promise<PaginatedResponse<M>> {
        const [entities, total] = await this.repository.findAndCount({
            order: { id: 'DESC' } as unknown as FindOptionsOrder<E>,
            take: limit,
            skip: offset,
        });
        return { items: this.mapper.toDomainList(entities), total, limit, offset };
    }

    public async verificationUpdate?(item: M, updatedItem: M): Promise<void> {
        if (this.isNewHashString(item, updatedItem) && this.update) await this.update(updatedItem);
        return;
    }

    private isNewHashString(object: M, newObject: M): boolean {
        const hashObject = convertObjectToHash<M>(object);
        const newHashObject = convertObjectToHash<M>(newObject);
        return hashObject !== newHashObject;
    }
}
