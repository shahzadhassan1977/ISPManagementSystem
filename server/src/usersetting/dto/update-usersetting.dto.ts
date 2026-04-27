import { PartialType } from '@nestjs/mapped-types';
import { CreateUserSettingDto } from './create-usersetting.dto';

export class UpdateUserSettingDto extends PartialType(CreateUserSettingDto) {}