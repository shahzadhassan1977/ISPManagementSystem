import { Repository } from 'typeorm';
import { Subarea } from './entities/subarea.entity';
import { Area } from '../area/entities/area.entity';
import { CreateSubareaDto } from './dto/create-subarea.dto';
export declare class SubareaService {
    private subareaRepo;
    private areaRepo;
    constructor(subareaRepo: Repository<Subarea>, areaRepo: Repository<Area>);
    create(createSubareaDto: CreateSubareaDto): Promise<Subarea>;
    findAll(): Promise<Subarea[]>;
    findOne(id: number): Promise<Subarea>;
    findByArea(areaId: number): Promise<Subarea[]>;
    update(id: number, dto: any): Promise<Subarea>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
