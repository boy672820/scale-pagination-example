export interface Page<T> {
  items: T[];
  totalCount: number;
  size: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}
