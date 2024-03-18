export type EntityIdType = string;

export type DefaultPojoType = Record<string, unknown>;

export interface Entity<T extends EntityIdType, PojoType = DefaultPojoType> {
  id?: T;
  toPOJO(): PojoType;
}
