export interface Repository<T> {
  read?: (entity: T) => Promise<T[] | undefined>
  readById?: (id: string) => Promise<T[] | undefined>
  create?: (entity: T) => Promise<Boolean | undefined>
  update?: (id: string, entity: T) => Promise<T[] | undefined>
  delete?: (id: string) => void
}
