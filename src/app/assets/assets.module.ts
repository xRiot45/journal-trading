import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetEntity } from './entities/asset.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AssetEntity])],
    controllers: [AssetsController],
    providers: [AssetsService],
})
export class AssetsModule {}
