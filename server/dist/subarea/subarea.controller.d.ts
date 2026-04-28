import { SubareaService } from './subarea.service';
import { CreateSubareaDto } from './dto/create-subarea.dto';
import { UpdateSubareaDto } from './dto/update-subarea.dto';
export declare class SubareaController {
    private service;
    constructor(service: SubareaService);
    create(createSubareaDto: CreateSubareaDto): Promise<import("./entities/subarea.entity").Subarea>;
    findAll(): Promise<import("./entities/subarea.entity").Subarea[]>;
    findOne(id: number): Promise<import("./entities/subarea.entity").Subarea>;
    update(id: number, updateSubareaDto: UpdateSubareaDto): Promise<import("./entities/subarea.entity").Subarea>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
