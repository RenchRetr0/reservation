export abstract class BaseMapper<E, M> {
    abstract toDomain(entity: E): M;
    abstract toEntity(model: M): E;

    public toDomainList(entities: E[]): M[] {
        return entities.map((entity) => this.toDomain(entity));
    }

    public toEntityList(modelList: Array<M>): Array<E> {
        return modelList.map((model) => this.toEntity(model));
    }
}
