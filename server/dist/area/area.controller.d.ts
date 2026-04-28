import { AreaService } from './area.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
export declare class AreaController {
    private readonly areaService;
    constructor(areaService: AreaService);
    create(dto: CreateAreaDto): Promise<import("./entities/area.entity").Area>;
    findAll(): Promise<import("./entities/area.entity").Area[]>;
    findOne(id: string): Promise<import("./entities/area.entity").Area>;
    update(id: string, dto: UpdateAreaDto): Promise<import("./entities/area.entity").Area>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
