import { CreateSubareaDto } from './create-subarea.dto';
declare const UpdateSubareaDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateSubareaDto>>;
export declare class UpdateSubareaDto extends UpdateSubareaDto_base {
    name?: string;
    areaId?: number;
}
export {};
