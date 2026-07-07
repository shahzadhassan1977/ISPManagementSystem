import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreatePortalSettingDto {
  @ApiProperty()
  @IsString()
  keyName!: string;

  @ApiProperty()
  @IsString()
  keyValue!: string;

  @ApiProperty()
  isActive!: boolean;
      
  @ApiProperty()
  isDeleted!: boolean;

  @ApiProperty()
  createdAt!: Date;
  
  @ApiProperty()
  updatedAt!: Date;
  
  @ApiProperty()
  createdBy!: number;
      
  @ApiProperty()
  updatedBy!: number;

}