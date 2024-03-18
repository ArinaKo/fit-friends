import { DefaultPojoType, Entity, EntityIdType } from './entity.interface';

export interface Repository<
  EntityType extends Entity<EntityIdType, PojoType>,
  PojoType = DefaultPojoType,
> {
  findById(id: EntityType['id']): Promise<EntityType | null>;
  save(entity: EntityType): Promise<EntityType>;
  update(id: EntityType['id'], entity: EntityType): Promise<EntityType>;
  deleteById(id: EntityType['id']): Promise<void>;
}
