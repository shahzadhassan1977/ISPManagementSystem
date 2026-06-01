import { Subarea } from '../../subarea/entities/subarea.entity';
export declare class Area {
    areaid: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    isDeleted: boolean;
    subAreas: Subarea[];
}
