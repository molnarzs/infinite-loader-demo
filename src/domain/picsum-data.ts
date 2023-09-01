import { IsUrl } from "class-validator";

export class PicsumData {
  @IsUrl(undefined, { message: "Invalid image URL" })
  url!: string;
}
