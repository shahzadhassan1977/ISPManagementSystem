import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreatePortalSettingDto {
  @ApiProperty()
  @IsString()
  keyName!: string;

  @ApiProperty()
  @IsString()
  keyValue!: string;

}