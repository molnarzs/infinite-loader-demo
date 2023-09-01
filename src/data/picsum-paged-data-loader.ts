import { PagedDataLoader } from "../domain/paged-data-loader";
import { PicsumData } from "../domain/picsum-data";
import { PicsumDataMapper } from "./picsum-data-mapper";

export class PicsumPagedDataLoader implements PagedDataLoader<PicsumData> {
  // We could have two approaches here: 1. make the page size configurable 2. leave as is, as the
  // service knows better the optimal page size. In this soultion, I choose the second approach.
  static pageSize = 20;

  async fetchPage(pageToken: string = "1") {
    const url = `https://picsum.photos/v2/list?page=${pageToken}&limit=${PicsumPagedDataLoader.pageSize}`;
    const response = await fetch(url);
    const dataItems = await response.json();
    const items = dataItems.map(PicsumDataMapper.fromApiToDomain);

    const nextPageToken =
      dataItems.length < PicsumPagedDataLoader.pageSize
        ? null
        : (Number.parseInt(pageToken) + 1).toString();

    return {
      nextPageToken,
      items,
    };
  }
}
