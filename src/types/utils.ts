export type WithoutId<T extends {_id: string}> = Omit<T, '_id'>;
