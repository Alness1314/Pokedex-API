import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PokemonService } from './services/pokemon.service';
import { PokemonController } from './controllers/pokemon.controller';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [MongooseModule.forFeature([{
    name: Pokemon.name,
    schema: PokemonSchema
  }])],
})
export class PokemonModule { }
