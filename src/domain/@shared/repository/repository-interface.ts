export default interface RepositoryInterface<T> {
  create(_entity: T): Promise<void>;
  update(_entity: T): Promise<void>;
  delete(_id: string): Promise<void>;
  find(_id: string): Promise<T>;
  findAll(): Promise<T[]>;
}
