import { PartialType } from '@nestjs/mapped-types';
import { CreatePortalSettingDto } from './create-portalsetting,dto';

export class UpdatePortalSettingDto extends PartialType(CreatePortalSettingDto) {}