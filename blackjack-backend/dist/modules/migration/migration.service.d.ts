import { Model } from 'mongoose';
import { Card } from 'src/schemas/card.schema';
export declare class MigrationService {
    private readonly cardModel;
    constructor(cardModel: Model<Card>);
    migrationData(): Promise<void>;
}
