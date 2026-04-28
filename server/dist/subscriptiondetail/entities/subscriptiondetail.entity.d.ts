import { Subscription } from '../../subscription/entities/subscription.entity';
export declare class Subscriptiondetail {
    id: number;
    installationDate: Date;
    installationCharges: number;
    wireCharges: number;
    deviceCharges: number;
    splitterCharges: number;
    fee: number;
    otherCharges: number;
    paid: number;
    remainingBalance: number;
    deviceMac: string;
    userId: string;
    password: string;
    staticIP: string;
    olt: string;
    oltPort: string;
    splitter: string;
    splitterPort: string;
    subscriptionId: number;
    subscription: Subscription;
    linemanId: number;
    areaRecoveryOfficerId: number;
    createdAt: Date;
    updatedAt: Date;
}
