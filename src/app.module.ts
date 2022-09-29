import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    //? Sirviendo contenido estatico
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..','public')
    }),
    //? Conectando la base de datos
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),

    PokemonModule,

    CommonModule
  ],
})
export class AppModule {}
