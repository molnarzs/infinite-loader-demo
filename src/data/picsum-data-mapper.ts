import { validateSync } from "class-validator";
import { PicsumData } from "../domain/picsum-data";

export class PicsumDataMapper {
  static fromApiToDomain(data: any): PicsumData {
    const result = new PicsumData();
    result.url = data?.download_url;
    const errors = validateSync(result);

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }

    return result;
  }
}
