
import axios ,{AxiosInstance} from 'axios'
import { Injectable } from '@nestjs/common';
import { PokemonResponse } from './interfaces/pokemon-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  // private readonly axios : AxiosInstance = axios

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter
  ){}

  async executeSeed() {

    await this.pokemonModel.deleteMany({})

    const  data = await this.http.get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')

    let pokemosToInsert : {name:string, no: number} [] = []

    data.results.forEach( ({ name, url }) => {

      const segments = url.split('/');
      const no = +segments[ segments.length - 2 ];

      const newPokemon = {name,no}

      pokemosToInsert.push(newPokemon)
    });

    await this.pokemonModel.insertMany(pokemosToInsert)

    return ;
  }
}
