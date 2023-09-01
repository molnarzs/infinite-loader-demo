export type PagedDataLoaderResult<T> = {
  nextPageToken: string | null;
  items: Array<T>;
};

export interface PagedDataLoader<T> {
  fetchPage(nextPageToken?: string): Promise<PagedDataLoaderResult<T>>;
}
