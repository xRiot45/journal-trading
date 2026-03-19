import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PairResponseDto {
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'The id of the currency pair' })
    @Expose()
    id: string;

    @ApiProperty({ example: 'XAUUSD', description: 'The symbol of the currency pair' })
    @Expose()
    name: string;

    @ApiProperty({ example: 'Gold vs USD', description: 'The description of the currency pair' })
    @Expose()
    description: string;

    @ApiProperty({ example: '2023-08-01T00:00:00.000Z', description: 'The creation date of the currency pair' })
    @Expose()
    createdAt: Date;

    @ApiProperty({ example: '2023-08-01T00:00:00.000Z', description: 'The update date of the currency pair' })
    @Expose()
    updatedAt: Date;
}
