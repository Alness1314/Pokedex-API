import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePokemonDto } from '../dto/create-pokemon.dto';
import { ResponsePokemonDto } from '../dto/response-pokemon.dto';
import { UpdatePokemonDto } from '../dto/update-pokemon.dto';
import { Pokemon } from '../entities/pokemon.entity';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly _pokemonModel: Model<Pokemon>,
  ) { }

  async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
    let pokemon!: Pokemon;
    try {
      pokemon = await this._pokemonModel.create(createPokemonDto);
    } catch (err) {
      this.handlerException(err);
    }
    //return plainToInstance(ResponsePokemonDto, pokemon);
    return pokemon;
  }

  async findAll(): Promise<Pokemon[]> {
    const pokemonList = await this._pokemonModel.find();
    return pokemonList;
  }

  async findOne(term: string): Promise<Pokemon> {
    let pokemon: Pokemon;
    if (!isNaN(+term)) {
      pokemon = await this._pokemonModel.findOne({ no: term });
    }
    //MONGO ID
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this._pokemonModel.findById(term);
    }
    //NAME POKEMON
    if (!pokemon) {
      pokemon = await this._pokemonModel.findOne({ name: term });
    }

    if (!pokemon) {
      throw new NotFoundException('pokemon not found');
    }
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    try {
      await pokemon.updateOne(updatePokemonDto);
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handlerException(error);
    }

  }

  async remove(id: string) {
    const { deletedCount } = await this._pokemonModel.deleteOne({ _id: id });
    if(deletedCount == 0)
      throw new NotFoundException('pokemon not found');
    return {
      statusCode: 200,
      message: 'Deleted pokemon was successfully'
    };
  }

  private handlerException(error: any){
    if (error.code === 11000) {
      throw new ConflictException('Pokemon already exists in DB');
    }
    throw new InternalServerErrorException('Pokemon not create in db');
  }
}
