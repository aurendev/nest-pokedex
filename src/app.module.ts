import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    //?Cargar archivo de configuracion de las vaiables de entorno
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema
    }),

    //? Sirviendo contenido estatico
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..','public')
    }),
    //? Conectando la base de datos
    MongooseModule.forRoot(process.env.MONGODB_URL),

    PokemonModule,

    CommonModule,

    SeedModule
  ],
})
export class AppModule {
  constructor(){
    console.log(process.env);
  }
}
