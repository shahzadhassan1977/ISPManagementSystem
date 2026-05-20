import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateUserSettingDto {
  @ApiProperty()
  @IsString()
  keyName!: string;

  @ApiProperty()
  @IsString()
  keyValue!: string;

  @ApiProperty()
  userId!: number;

  @ApiProperty()
  isActive!: boolean;
      
  @ApiProperty()
  isDeleted!: boolean;

}