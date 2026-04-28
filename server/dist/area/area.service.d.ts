import { Repository } from 'typeorm';
import { Area } from './entities/area.entity';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
export declare class AreaService {
    private areaRepo;
    constructor(areaRepo: Repository<Area>);
    create(dto: CreateAreaDto): Promise<Area>;
    findAll(): Promise<Area[]>;
    findOne(id: number): Promise<Area>;
    update(id: number, dto: UpdateAreaDto): Promise<Area>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
